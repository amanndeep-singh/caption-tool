// --- 1. GLOBAL VARIABLES & PAGE DETECTION ---
let currentMediaType = 'image';
let currentPage = 'instagram'; // Default

window.onload = function () {
    const path = window.location.pathname;
    const toneSelect = document.getElementById('toneSelect');

    if (path.includes("tiktok")) {
        currentPage = 'tiktok';
        if (toneSelect) toneSelect.value = "viral";
    } else if (path.includes("linkedin")) {
        currentPage = 'linkedin';
        if (toneSelect) toneSelect.value = "professional";
    } else if (path.includes("youtube")) {
        currentPage = 'youtube';
        if (toneSelect) toneSelect.value = "seo";
    } else {
        currentPage = 'instagram';
    }
};

// --- 2. HUGE DATABASE (Shuffle ke liye data chahiye) 📚 ---
const captionDB = {
    // === INSTAGRAM ===
    instagram: {
        gym: [
            "Sore today, strong tomorrow. 💪 #fitness",
            "Sweat is just fat crying. 💦",
            "Beast mode: ON. 🦍",
            "I don't find time, I make time.",
            "Pain is temporary, pride is forever. 🔥",
            "Your only limit is you.",
            "Train insane or remain the same.",
            "Hustle for that muscle. 🏋️‍♂️",
            "Gym hair, don't care.",
            "Excuses don't burn calories."
        ],
        travel: [
            "Catch flights, not feelings. ✈️",
            "Wanderlust and city dust. 🌍",
            "Collecting moments, not things.",
            "Life is short and the world is wide.",
            "Adventure awaits. 🏔️",
            "Ocean air, salty hair. 🌊",
            "Jobs fill your pocket, adventures fill your soul.",
            "Vacation mode: Activated. ✅",
            "Travel is the only thing you buy that makes you richer.",
            "Let's find some beautiful place to get lost."
        ],
        food: [
            "Good food = Good mood. 🍕",
            "First we eat, then we do everything else.",
            "Taste of heaven. 😋",
            "Calories don't count on weekends.",
            "Made with love (and extra cheese). 🧀",
            "Food is my love language.",
            "Life is uncertain. Eat dessert first. 🍰",
            "Brunch is always a good idea.",
            "Count memories, not calories."
        ],
        default: [
            "Living my best life ✨",
            "Details matter. 👀",
            "Vibes don't lie. 🌊",
            "Just me being me.",
            "Creating my own sunshine. ☀️",
            "Life is better when you're laughing.",
            "Main character energy. 💅",
            "Simplicity is the ultimate sophistication.",
            "Do more of what makes you happy.",
            "Smile, it confuses people."
        ]
    },

    // === TIKTOK ===
    tiktok: {
        gym: [
            "POV: You finally started seeing results... 🤯",
            "Stop doing this mistake in the gym! 🛑",
            "3 Exercises that changed my body fast ⚡",
            "Wait for the drop... 💪",
            "If you skip leg day, scroll away. 🦵",
            "This gym hack feels illegal to know. 🤫",
            "Day 1 vs Day 30 Transformation. 🔥",
            "Gym logic that makes zero sense. 😂"
        ],
        travel: [
            "You won't believe this place exists... 🌍",
            "This is your sign to book that flight. ✈️",
            "Top 3 hidden gems in [Location] 🤫",
            "Don't visit here unless you want to fall in love. 😍",
            "Travel hack: How to save 50% on flights. 💸",
            "POV: You woke up in paradise. 🏝️",
            "Send this to your travel buddy. 👇",
            "The reality of traveling solo... 😳"
        ],
        default: [
            "Wait for the end... 🤯",
            "I wish I knew this sooner! 🛑",
            "This secret hack changed everything ⚡",
            "POV: You finally found the perfect tool. 🔥",
            "Do not skip this video! ⚠️",
            "Why is nobody talking about this? 🗣️",
            "Life hack level: 1000. 🧠",
            "Tag someone who needs to see this. 👇"
        ]
    },

    // === LINKEDIN ===
    linkedin: {
        gym: [
            "Discipline in the gym translates to discipline in business. 💼 #Growth",
            "Consistency is the key to success, whether in fitness or career. 🚀",
            "Health is the best investment you can make. Agree? 👇",
            "Today's workout taught me a valuable lesson about resilience.",
            "Why I wake up at 5 AM to train (It's not just for muscles).",
            "Success isn't owned, it's rented. And rent is due every day."
        ],
        default: [
            "Excited to announce my next chapter! 🚀 #Growth",
            "Big things take time. Trust the process. 💼",
            "Networking is the net worth. 🤝 #Business",
            "Here is what I learned today... 💡",
            "Failure is just data collection. Keep going.",
            "Leadership is about empathy, not authority."
        ]
    },

    // === YOUTUBE ===
    youtube: {
        default: [
            "TITLE: Why everyone is wrong about this... 😲",
            "TITLE: The Truth About [Topic] Revealed!",
            "TAGS: viral video, trending now, how to viral, best tips 2026",
            "TAGS: review, tutorial, explained, reaction video",
            "TITLE: I Tried [Topic] for 24 Hours (Regret?) 😱",
            "TITLE: 5 Mistakes Beginners Make with [Topic] ❌",
            "TAGS: guide, walkthrough, secret hacks, best settings"
        ]
    }
};

// --- 3. UI FUNCTIONS ---
function switchMedia(type, btn) {
    currentMediaType = type;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const uploadText = document.getElementById('uploadText');
    const icon = document.getElementById('uploadIcon');
    if (type === 'video') {
        uploadText.innerText = "Click to Upload Video";
        icon.className = "fa-solid fa-file-video";
    } else {
        uploadText.innerText = "Click to Upload Photo";
        icon.className = "fa-solid fa-cloud-arrow-up";
    }
}

function handleFileUpload() {
    const fileInput = document.getElementById('fileInput');
    const uploadText = document.getElementById('uploadText');
    if (fileInput.files.length > 0) {
        uploadText.innerText = "Ready: " + fileInput.files[0].name;
        uploadText.style.color = "#4ade80";
    }
}

// --- 4. GENERATE LOGIC ---
function generateCaptions() {
    const inputField = document.getElementById('userContext');
    const errorMsg = document.getElementById('errorMsg');
    const loading = document.getElementById('loadingBox');
    const results = document.getElementById('resultArea');
    const loadingText = document.getElementById('loadingText');

    const context = inputField.value.trim().toLowerCase();

    if (context === "") {
        inputField.classList.add('shake-input');
        errorMsg.style.display = "block";
        setTimeout(() => { inputField.classList.remove('shake-input'); }, 500);
        return;
    }

    errorMsg.style.display = "none";
    results.style.display = 'none';
    loading.style.display = 'block';

    let step1 = currentMediaType === 'video' ? "Analyzing Frames... 🎥" : "Scanning Image... 🖼️";
    let step2 = currentPage === 'youtube' ? "Checking SEO Volume... 📈" : "Generating Viral Hooks... 🧠";

    loadingText.innerText = step1;
    setTimeout(() => { loadingText.innerText = step2; }, 1000); // Thoda fast kar diya refresh feel ke liye

    setTimeout(() => {
        loading.style.display = 'none';
        results.style.display = 'block';
        displayResults(context);
    }, 2000);
}

// --- 5. RANDOM SHUFFLE & DISPLAY (Slot Machine Logic) 🎰 ---
function displayResults(text) {
    const list = document.getElementById('captionsList');
    list.innerHTML = "";

    // Category Selection Logic
    let selectedCategory = 'default';
    if (text.includes("gym") || text.includes("fit") || text.includes("workout")) selectedCategory = 'gym';
    else if (text.includes("travel") || text.includes("trip") || text.includes("beach")) selectedCategory = 'travel';
    else if (text.includes("food") || text.includes("eat") || text.includes("cook")) selectedCategory = 'food';

    // Data Fetch
    let allCaptions = captionDB[currentPage][selectedCategory];
    if (!allCaptions) allCaptions = captionDB[currentPage]['default'];

    // --- MAGIC: SHUFFLE THE ARRAY ---
    // Har baar random order karega
    let shuffled = allCaptions.sort(() => 0.5 - Math.random());

    // Pick top 4
    let selected = shuffled.slice(0, 4);

    // Render
    selected.forEach(cap => {
        let div = document.createElement('div');
        div.className = "caption-item";
        div.innerHTML = `
            <div class="caption-text">${cap}</div>
            <button class="copy-btn" onclick="copyText(this, '${cap}')">
                <i class="fa-regular fa-copy"></i>
            </button>
        `;
        list.appendChild(div);
    });

    // --- REFRESH BUTTON (Keep them in the loop) ---
    // Ye button neeche aayega taaki user baar baar click kare
    let btnContainer = document.createElement('div');
    btnContainer.className = "load-more-container";
    btnContainer.innerHTML = `
        <button class="load-more-btn" onclick="refreshCaptions('${text}')">
            <i class="fa-solid fa-rotate-right"></i> Generate More (Refresh)
        </button>
    `;
    list.appendChild(btnContainer);
}

// --- 6. REFRESH FUNCTION ---
// Ye function bas wapas displayResults call karega, jo wapas shuffle karega
function refreshCaptions(text) {
    const list = document.getElementById('captionsList');

    // Thoda sa "Loading" effect fake karne ke liye
    list.style.opacity = "0.5";

    setTimeout(() => {
        list.style.opacity = "1";
        displayResults(text); // Phir se random 4 utha lega
    }, 300);
}

function copyText(btn, text) {
    navigator.clipboard.writeText(text);
    btn.innerHTML = `<i class="fa-solid fa-check" style="color: #4ade80;"></i>`;
    setTimeout(() => { btn.innerHTML = `<i class="fa-regular fa-copy"></i>`; }, 2000);
}

// Menu Functions
function toggleMenu() { document.getElementById('sidebar').classList.toggle('active'); }
function closeMenu() { document.getElementById('sidebar').classList.remove('active'); }
