// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract myNFTstore is ERC721URIStorage {
    address payable public marketplaceOwner;
    uint256 public listingFeePercent = 20;
    uint256 private currentTokenId;
    uint256 private totalItemsSold;

    struct NFTListing {
        uint256 tokenId;
        address payable owner; // Current owner of the NFT
        address payable seller; // Seller of the NFT
        address creator; // Creator of the NFT
        uint256 price; // Price of the NFT
    }

    mapping(uint256 => NFTListing) private tokenIdToListing;

    // Mappings to track created and bought NFTs
    mapping(address => uint256[]) private createdNFTs; // NFTs created by user
    mapping(address => uint256[]) private boughtNFTs; // NFTs bought by user

    // Events for better tracking and front-end integration
    event TokenCreated(
        uint256 indexed tokenId,
        address indexed creator,
        string tokenURI,
        uint256 price
    );
    event SaleExecuted(
        uint256 indexed tokenId,
        address indexed seller,
        address indexed buyer,
        uint256 price
    );
    event NFTResold(
        uint256 indexed tokenId,
        address indexed seller,
        uint256 price
    );

    modifier onlyOwner() {
        require(
            msg.sender == marketplaceOwner,
            "Only owner can call this function"
        );
        _;
    }

    constructor() ERC721("myNFTstore", "NFTS") {
        marketplaceOwner = payable(msg.sender);
    }

    // Update the listing fee percentage
    function updateListingFeePercent(
        uint256 _listingFeePercent
    ) public onlyOwner {
        listingFeePercent = _listingFeePercent;
    }

    // Get the current listing fee percentage
    function getListingFeePercent() public view returns (uint256) {
        return listingFeePercent;
    }

    // Get the current token ID
    function getCurrentTokenId() public view returns (uint256) {
        return currentTokenId;
    }

    // Get details of a specific NFT listing
    function getNFTListing(
        uint256 _tokenId
    ) public view returns (NFTListing memory) {
        return tokenIdToListing[_tokenId];
    }

    ///////////// CREATE NFT TOKEN ///////////////////

    function createToken(
        string memory _tokenURI,
        uint256 _price
    ) public returns (uint256) {
        require(_price > 0, "Price must be greater than zero");

        currentTokenId++;
        uint256 newTokenId = currentTokenId;
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, _tokenURI);
        _createNFTListing(newTokenId, _price, msg.sender); // Pass creator address

        createdNFTs[msg.sender].push(newTokenId); // Track created NFTs

        emit TokenCreated(newTokenId, msg.sender, _tokenURI, _price); // Emit event

        return newTokenId;
    }

    ///////////// CREATE NFT LISTING ///////////////////

    function _createNFTListing(
        uint256 _tokenId,
        uint256 _price,
        address _creator
    ) private {
        tokenIdToListing[_tokenId] = NFTListing({
            tokenId: _tokenId,
            owner: payable(msg.sender), // Current owner is the one who created the NFT
            seller: payable(msg.sender), // Seller is the one who created the NFT
            creator: _creator, // Set the creator address
            price: _price
        });
    }

    ///////////// NFT SALE TRANSACTION ///////////////////

    function executeSale(uint256 tokenId) public payable {
        NFTListing storage listing = tokenIdToListing[tokenId];
        uint256 price = listing.price;
        address payable seller = listing.seller;

        require(
            msg.value == price,
            "Please submit the asking price to complete the purchase"
        );
        require(seller != msg.sender, "Seller cannot buy their own NFT");

        // Remove the NFT from the seller's created NFTs
        _removeCreatedNFT(seller, tokenId);

        // Transfer ownership
        _transfer(seller, msg.sender, tokenId);

        // Update the listing details
        listing.owner = payable(msg.sender); // Update the owner
        listing.seller = payable(msg.sender); // The new owner is now the seller
        totalItemsSold++;

        // Add the NFT to the buyer's bought NFTs
        boughtNFTs[msg.sender].push(tokenId);

        // Calculate and transfer listing fee to the marketplace owner
        uint256 listingFee = (price * listingFeePercent) / 100;
        marketplaceOwner.transfer(listingFee);

        // Transfer the remaining amount to the seller
        seller.transfer(msg.value - listingFee);

        emit SaleExecuted(tokenId, seller, msg.sender, price); // Emit event
    }

    ///////////// RESALE NFT ///////////////////

    function resellNFT(uint256 tokenId) public {
        NFTListing storage listing = tokenIdToListing[tokenId];

        require(
            ownerOf(tokenId) == msg.sender,
            "Only the owner can resell the NFT"
        );

        // Fetch the original price from the listing
        uint256 originalPrice = listing.price;

        // Remove the NFT from the seller's bought NFTs
        _removeBoughtNFT(msg.sender, tokenId);

        // Set the listing price to the original price for resale
        listing.price = originalPrice; // Use the original price
        listing.seller = payable(msg.sender);

        // Add the NFT back to the seller's created NFTs
        createdNFTs[msg.sender].push(tokenId);

        emit NFTResold(tokenId, msg.sender, originalPrice); // Emit event
    }

    ///////////// REMOVE CREATED NFT ///////////////////

    function _removeCreatedNFT(address seller, uint256 tokenId) private {
        uint256[] storage nfts = createdNFTs[seller];
        for (uint256 i = 0; i < nfts.length; i++) {
            if (nfts[i] == tokenId) {
                nfts[i] = nfts[nfts.length - 1]; // Swap with the last one
                nfts.pop(); // Remove the last element
                break;
            }
        }
    }

    ///////////// REMOVE BOUGHT NFT ///////////////////

    function _removeBoughtNFT(address buyer, uint256 tokenId) private {
        uint256[] storage nfts = boughtNFTs[buyer];
        for (uint256 i = 0; i < nfts.length; i++) {
            if (nfts[i] == tokenId) {
                nfts[i] = nfts[nfts.length - 1]; // Swap with the last one
                nfts.pop(); // Remove the last element
                break;
            }
        }
    }

    ///////////// GET ALL LISTED NFTs ///////////////////

    function getAllListedNFTs() public view returns (NFTListing[] memory) {
        uint256 totalNFTCount = currentTokenId;
        NFTListing[] memory listedNFTs = new NFTListing[](totalNFTCount);
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalNFTCount; i++) {
            uint256 tokenId = i + 1;
            NFTListing storage listing = tokenIdToListing[tokenId];
            listedNFTs[currentIndex] = listing;
            currentIndex += 1;
        }

        return listedNFTs;
    }

    ///////////// GET OWN NFTs ///////////////////

    function getMyNFTs() public view returns (NFTListing[] memory) {
        uint256 totalNFTCount = currentTokenId;
        uint256 myNFTCount = 0;
        uint256 currentIndex = 0;

        // First pass to count NFTs owned or selling by the caller
        for (uint256 i = 0; i < totalNFTCount; i++) {
            if (
                tokenIdToListing[i + 1].owner == msg.sender ||
                tokenIdToListing[i + 1].seller == msg.sender
            ) {
                myNFTCount++;
            }
        }

        NFTListing[] memory myNFTs = new NFTListing[](myNFTCount);
        for (uint256 i = 0; i < totalNFTCount; i++) {
            if (
                tokenIdToListing[i + 1].owner == msg.sender ||
                tokenIdToListing[i + 1].seller == msg.sender
            ) {
                uint256 tokenId = i + 1;
                NFTListing storage listing = tokenIdToListing[tokenId];
                myNFTs[currentIndex] = listing;
                currentIndex++;
            }
        }

        return myNFTs;
    }

    ///////////// GET CREATED NFTs ///////////////////
    function getCreatedNFTs() public view returns (uint256[] memory) {
        return createdNFTs[msg.sender]; // Return the created NFTs for the caller
    }

    ///////////// GET BOUGHT NFTs ///////////////////
    function getBoughtNFTs() public view returns (uint256[] memory) {
        return boughtNFTs[msg.sender]; // Return the bought NFTs for the caller
    }
}
