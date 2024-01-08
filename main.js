class Entry {
    constructor(date, time, journalEntry, mood) {
        this.date = date;
        this.time = time;
        this.journalEntry = journalEntry;
        this.mood = mood;
    }

    isEmpty() {
        if(this.date === '' && this.time === '' && this.journalEntry === '' && this.mood === '') {
            return true;
        } else {
            return false;
        }
    }

    setDate(newDate) {
        this.date = newDate;
    }
    setTime(newTime) {
        this.time = newTime;
    }
    setJournalEntry(newJournalEntry) {
        this.journalEntry = newJournalEntry;
    }
    setMood(newMood) {
        this.mood = newMood;
    }
}

class Calendar {
    constructor(entries, lastClickedEntry) {
        this.entries = entries;
        this.lastClickedEntry = lastClickedEntry;
    }

    setEntries(newEntries) {
        this.entries = newEntries;
    }
}

const calendar = new Calendar([]);

if(Object.is(sessionStorage.getItem("CalendarArray"), null)) {
    const calendarEntries = [];
    for(let i = 0; i < 365; i++) {
        const entry = new Entry('', '', '', '');
        calendarEntries.push(entry);
    }
    calendar.setEntries(calendarEntries);
} else {
    const sessionString = sessionStorage.getItem("CalendarArray");
    const calendarEntries = JSON.parse(sessionString);
    for(let i = 0; i < 365; i++) {
        temp = calendarEntries[i];
        const entry = new Entry(temp.date, temp.time, temp.journalEntry, temp.mood);
        calendarEntries[i] = entry;
    }
    calendar.setEntries(calendarEntries);
}

const redMoods = ['Enraged', 'Panicked', 'Stressed', 'Jittery', 'Shocked', 'Livid', 'Furious', 'Frustrated', 'Tense', 'Stunned', 'Fuming', 'Frightened', 'Angry', 'Nervous', 'Restless', 'Anxious', 'Apprehensive', 'Worried', 'Irritated', 'Annoyed', 'Repulsed', 'Troubled', 'Concerned', 'Uneasy', 'Peeved'];
const yellowMoods = ['Surprised', 'Upbeat', 'Festive', 'Exhilarated', 'Ecstatic', 'Hyper', 'Cheerful', 'Motivated', 'Inspired', 'Elated', 'Energized', 'Lively', 'Enthusiastic', 'Optimistic', 'Excited', 'Pleased', 'Happy', 'Focused', 'Proud', 'Thrilled', 'Pleasant', 'Joyful', 'Hopeful', 'Playful', 'Blissful'];
const blueMoods = ['Disgusted', 'Glum', 'Disappointed', 'Down', 'Apathetic', 'Pessimistic', 'Morose', 'Discouraged', 'Sad', 'Bored', 'Alienated', 'Miserable', 'Lonely', 'Disheartened', 'Tired', 'Despondent', 'Depressed', 'Sullen', 'Exhausted', 'Fatigued', 'Despair', 'Hopeless', 'Desolate', 'Spent', 'Drained'];
const greenMoods = ['At Ease', 'Easygoing', 'Content', 'Loving', 'Fulfilled', 'Calm', 'Secure', 'Satisfied', 'Grateful', 'Touched', 'Relaxed', 'Chill', 'Restful', 'Blessed', 'Balanced', 'Mellow', 'Thoughtful', 'Peaceful', 'Comfy', 'Carefree', 'Sleepy', 'Complacent', 'Tranquil', 'Cozy', 'Serene'];

const moodInput = document.querySelector('#mood');
const dateInput = document.querySelector('#date');
const timeInput = document.querySelector('#time');
const journalInput = document.querySelector('#journal');

function determineMood(mood) {
    if(redMoods.includes(mood)) {
        return "red";
    } else if(yellowMoods.includes(mood)) {
        return "yellow";
    } else if(blueMoods.includes(mood)) {
        return "blue";
    } else if(greenMoods.includes(mood)) {
        return "green";
    } else {
        alert('Error with the system.'); //Should not run unless broken
    }
}

function calculateDay(date) {
    const month = date.substr(0, date.indexOf('/'));
    const day = Number(date.substr(date.indexOf('/')+1));
    switch(month) {
        case '1':
            return day;
        case '2':
            return 31 + day;
        case '3':
            return 59 + day;
        case '4':
            return 90 + day;
        case '5':
            return 120 + day;
        case '6':
            return 151 + day;
        case '7':
            return 181 + day;
        case '8':
            return 212 + day;
        case '9':
            return 243 + day;
        case '10':
            return 273 + day;
        case '11':
            return 304 + day;
        case '12':
            return 334 + day;
        }
}

//For all .date-button's from main.html --> get the id to get the array elements and put inside the boxes
const calendarBtns = document.getElementsByClassName('date-button');
const buttonPressed = e => {
    console.log(e.target.id);
    sessionStorage.setItem("DateToChange", JSON.stringify(e.target.id));
}
for(let calendarBtn of calendarBtns) {
    calendarBtn.addEventListener("click", buttonPressed);
}

const updateBtn = document.querySelector('.update-button');
const resetBtn = document.querySelector('.reset-button');
const exitBtn = document.querySelector('.exit-button');
if(updateBtn && resetBtn && exitBtn) {
    updateBtn.addEventListener('click', onUpdate);
    resetBtn.addEventListener('click', resetFunc);
    exitBtn.addEventListener('click', updateCalendar);

    if(!(Object.is(sessionStorage.getItem("DateToChange"), null)) && !(calendar.entries[JSON.parse(sessionStorage.getItem("DateToChange"))-1].isEmpty())) {
        const sessionString = sessionStorage.getItem("DateToChange");
        const changingDate = JSON.parse(sessionString) - 1;
        console.log(changingDate);

        moodInput.value = calendar.entries[changingDate].mood;
        dateInput.value = calendar.entries[changingDate].date;
        timeInput.value = calendar.entries[changingDate].time;
        journalInput.value = calendar.entries[changingDate].journalEntry;
        document.getElementById("color-box").style.backgroundColor = determineMood(calendar.entries[changingDate].mood);
    }
}
function onUpdate(e) {
    if(dateInput.value === '' || timeInput.value === '' || journalInput.value === '') {
        alert('Please Enter ALL Fields');
    } else if(!(redMoods.includes(moodInput.value) || yellowMoods.includes(moodInput.value) || blueMoods.includes(moodInput.value) || greenMoods.includes(moodInput.value) )) {
        alert('Choose a mood that is shown below and ONLY capitalize the start of each word');
    } else if(!(dateInput.value.includes('/') && dateInput.value.length >= 3 && dateInput.value.length <= 5)) {
        alert('Make sure to input the date in MM/DD format');
    } else if(!(timeInput.value.includes(':') && timeInput.value.length >= 3 && timeInput.value.length <= 5)) {
        alert('Make sure to input the time in HH:MM format');
    } else {
        const entryNumber = calculateDay(dateInput.value)-1;
        calendar.entries[entryNumber].setDate(dateInput.value);
        calendar.entries[entryNumber].setTime(timeInput.value);
        calendar.entries[entryNumber].setJournalEntry(journalInput.value);
        calendar.entries[entryNumber].setMood(moodInput.value);

        document.getElementById("color-box").style.backgroundColor = determineMood(moodInput.value);
        console.log(calendar.entries); //Check shows correctly on console
    }
}
function resetFunc() {
    for(let i = 0; i < 365; i++) {
        const entry = new Entry('', '', '', '');
        calendar.entries[i] = entry;
    }
}
function updateCalendar() {
    sessionStorage.setItem("CalendarArray", JSON.stringify(calendar.entries));
}

if(document.getElementById("1")) {
    console.log("Opened Mood Journal");

    //Check the entries and change the calendar colors accordingly
    for(let i = 1; i <= 365; i++) {
        if(!(calendar.entries[i-1].isEmpty())) {
            const moodColor = determineMood(calendar.entries[i-1].mood);
            document.getElementById("" + i).style.backgroundColor = moodColor;
        }
    }
}