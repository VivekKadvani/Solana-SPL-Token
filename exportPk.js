import base58 as bs58 from "bs58";

const privateKeyArray = [
    30, 128, 83, 204, 163, 46, 139, 108, 198, 44, 32, 52, 192, 114, 226, 68,
    206, 204, 142, 113, 207, 131, 66, 97, 138, 184, 238, 188, 108, 166, 239, 14,
    11, 144, 131, 0, 195, 5, 55, 160, 201, 91, 148, 73, 156, 213, 176, 127, 102,
    65, 40, 63, 184, 87, 82, 100, 51, 60, 236, 135, 183, 21, 182, 14
];

// Convert to Buffer
const privateKeyBuffer = Buffer.from(privateKeyArray);

// Encode to Base58
const base58Key = bs58.encode(privateKeyBuffer);

console.log("Base58 Encoded Key:", base58Key);
