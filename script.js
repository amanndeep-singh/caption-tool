// --- 1. DATA (Bhai yahan tujhe mehnat karni hai, 50 caption daal de) ---
const captionsDB = {
    gym: [
        "Sweat now, shine later. 💦 #Gym", "Pain is temporary. 💪", "Beast Mode ON. 🦍", 
        "I don't sweat, I sparkle. ✨", "My therapy session. 🏋️‍♂️", "Hustle for that muscle.", 
        "Train like a beast.", "Eat. Sleep. Gym. Repeat.", "Focus on your goals.", "Stronger every day."
    ],
    love: [
        "You are my favorite. ❤️", "Together is a wonderful place to be.", "My happy place. 💑",
        "Just us. ✨", "Love you to the moon.", "Partner in crime. 👮‍♀️", "My heart belongs to you.",
        "Better together.", "Creating memories.", "Forever kinda love."
    ],
    travel: [
        "Wanderlust. 🌍", "Adventure awaits. ✈️", "Catch flights not feelings.", 
        "Ocean air, salty hair. 🌊", "Road trip vibes. 🚗", "Exploring the unseen.", 
        "Nature lover. 🍃", "Living my best life.", "Travel therapy.", "Lost in the right direction."
    ],
    attitude: [
        "Born to shine. ✨", "My life, my rules. 😎", "Savage but sweet.", 
        "Not your backup plan.", "Classy & Sassy.", "Level up. 🚀", 
        "Unstoppable.", "Watch me win.", "Silent but deadly.", "Too glam to give a damn."
    ],
    // Default captions agar kuch match na ho
    random: [
        "Just vibing. ✨", "Photo dump. 📸", "Good times.", "Living in the moment.", 
        "Making memories.", "Golden hour.", "Smile more.", "Life is beautiful.", 
        "Chasing dreams.", "Stay real."
    ]
};

// --- 2. FAKE IMAGE UPLOAD LOGIC ---
function imageUploaded() {
    // Jab user file select karega, bas text change kar denge
    // Asli upload nahi ho raha, bas dikhawa hai 😉
    document.getElementById("uploadIcon").className = "fa-solid fa-check";
    document.getElementById("uploadIcon").style.color = "green";
    document.getElementById("uploadText").innerText = "Photo Selected! ✅";
}

// --- 3. GENERATE CAPTIONS LOGIC ---
function generateCaptions() {
    let input = document.getElementById("userInput").value.toLowerCase().trim();
    
    // VALIDATION: Bina description ke nahi chalega
    if(input === "") {
        alert("Bhai Photo ko Describe toh karo! (Description is required)");
        return;
    }

    // LOADING SHOW KARO
    document.getElementById("resultArea").style.display = "none";
    document.getElementById("loadingBox").style.display = "block";

    // 1.5 Second ka Fake Wait
    setTimeout(() => {
        let category = "random"; // Default

        // KEYWORD MATCHING
        if (input.includes("gym") || input.includes("fit") || input.includes("run")) category = "gym";
        else if (input.includes("love") || input.includes("gf") || input.includes("couple")) category = "love";
        else if (input.includes("travel") || input.includes("trip") || input.includes("beach")) category = "travel";
        else if (input.includes("attitude") || input.includes("style") || input.includes("cool")) category = "attitude";

        // Category se list nikalo
        let fullList = captionsDB[category];

        // --- SHUFFLE LOGIC (Taaki har baar alag 5 aayein) ---
        // Ye array ko mix kar deta hai (Taash ke patto ki tarah)
        let shuffled = fullList.sort(() => 0.5 - Math.random());
        
        // Pehle 5 utha lo
        let selected5 = shuffled.slice(0, 5);

        // HTML Banana
        let listHTML = "";
        selected5.forEach((caption) => {
            listHTML += `
                <div class="caption-card">
                    <span class="caption-text">${caption}</span>
                    <button class="copy-small-btn" onclick="copySingle('${caption}')">
                        <i class="fa-solid fa-copy"></i> Copy
                    </button>
                </div>
            `;
        });

        // Result Show Karo
        document.getElementById("captionsList").innerHTML = listHTML;
        document.getElementById("loadingBox").style.display = "none";
        document.getElementById("resultArea").style.display = "block";

    }, 1500);
}

// --- 4. SINGLE COPY FUNCTION ---
function copySingle(text) {
    navigator.clipboard.writeText(text);
    alert("Caption Copied: " + text);
}