const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const authMiddleware = require('../middleware/authMiddleware');  // Import your auth middleware

const router = express.Router();

// Function to execute code based on language
const runCode = (language, code, callback) => {
    let filename, command, className;  // Declare className here so it's available later

    // Generate a unique identifier for the file
    const uniqueId = Date.now() + Math.floor(Math.random() * 10000);
    
    // Get absolute path of the temp directory (ensure it is outside the controller folder)
    const tempDir = path.resolve(__dirname, '../temp');  // Adjust path to temp directory

    // Ensure temp directory exists
    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
    }

    // Determine filename and command based on the language
    switch (language.toLowerCase()) {
        case 'c':
            filename = path.join(tempDir, `temp_${uniqueId}.c`);
            fs.writeFileSync(filename, code);
            command = `gcc "${filename}" -o "${path.join(tempDir, `temp_${uniqueId}`)}" && "${path.join(tempDir, `./temp_${uniqueId}`)}"`;
            break;

        case 'cpp':
        case 'c++':
            filename = path.join(tempDir, `temp_${uniqueId}.cpp`);
            fs.writeFileSync(filename, code);
            command = `g++ "${filename}" -o "${path.join(tempDir, `temp_${uniqueId}`)}" && "${path.join(tempDir, `./temp_${uniqueId}`)}"`;
            break;

        case 'python':
            filename = path.join(tempDir, `temp_${uniqueId}.py`);
            fs.writeFileSync(filename, code);
            command = `python3 "${filename}"`;
            break;

        case 'javascript':
            filename = path.join(tempDir, `temp_${uniqueId}.js`);
            fs.writeFileSync(filename, code);
            command = `node "${filename}"`;
            break;

        case 'java':
            className = `Temp_${uniqueId}`;  // Generate unique class name
            code = code.replace(/public class Temp/, `public class ${className}`); // Replace class name in code
            filename = path.join(tempDir, `${className}.java`); // Filename matches the class name
            fs.writeFileSync(filename, code);
            command = `javac "${filename}" && java -cp "${tempDir}" ${className}`; // Java compilation and execution
            break;

        default:
            return callback(`Unsupported language: ${language}`);
    }

    // Execute the code using child_process exec
    exec(command, (error, stdout, stderr) => {
        if (error) {
            return callback(`Error during execution: ${stderr || error.message}`);
        }

        // Cleanup: Ensure we delete the files after execution
        try {
            // Delete source file
            if (fs.existsSync(filename)) {
                fs.unlinkSync(filename);  // Delete source file
            }

            // For compiled languages, delete compiled binary/executable after execution
            const executablePath = path.join(tempDir, `temp_${uniqueId}`);
            if (['c', 'cpp', 'c++'].includes(language.toLowerCase()) && fs.existsSync(executablePath)) {
                fs.unlinkSync(executablePath);  // Delete compiled binary (if applicable)
            }

            // For Java, remove the compiled `.class` file if created
            if (language.toLowerCase() === 'java') {
                const classFilePath = path.join(tempDir, `${className}.class`);
                if (fs.existsSync(classFilePath)) {
                    fs.unlinkSync(classFilePath);  // Delete Java class file
                }
            }
        } catch (cleanupError) {
            console.error(`Error cleaning up files: ${cleanupError.message}`);
        }

        callback(null, stdout);
    });
};

// Route to execute code, protected with JWT
router.post('/execute', authMiddleware, (req, res) => {  // Protect the route with the authMiddleware
    const { code, language } = req.body;

    // Validate the inputs
    if (!code || !language) {
        return res.status(400).json({ error: 'Code and language are required' });
    }

    // Run the code using the runCode function
    runCode(language, code, (error, output) => {
        if (error) {
            return res.status(500).json({ error });
        }
        res.json({ output });
    });
});

module.exports = router;
