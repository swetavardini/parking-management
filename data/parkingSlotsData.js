const parkingSlotsData = [
    {
        name: "Slot A1",
        type: "Compact",
        location: "Level 1",
        available: true,
        bookedBy: null
    },
    {
        name: "Slot A2",
        type: "Compact",
        location: "Level 1",
        available: false,
        bookedBy: "60d21b4667d0d8992e610c85" // Example ObjectId
    },
    {
        name: "Slot B1",
        type: "Large",
        location: "Level 2",
        available: true,
        bookedBy: null
    },
    {
        name: "Slot B2",
        type: "Large",
        location: "Level 2",
        available: false,
        bookedBy: "60d21b4667d0d8992e610c86" // Example ObjectId
    }
];

export default parkingSlotsData;
