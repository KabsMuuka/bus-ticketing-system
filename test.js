// Input array
const data = ['{"kabs"}'];

// Extract the string
let nam = data[0]; // Get the first element of the array

// Remove unwanted characters: {, }, and "
nam = nam.replace(/[{}"]/g, "");

console.log("Cleaned name:", nam);
