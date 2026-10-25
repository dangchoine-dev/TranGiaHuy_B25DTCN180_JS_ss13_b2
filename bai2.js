let passengers = [];
let seatList = ["12A", "12B", "12C", "14A", "14B", "14C"];

// Kiem tra giay to
function validateId(idNumber) {
    let cccd = /^\d{12}$/;
    let passport = /^[A-Za-z]\d{7,8}$/;

    return cccd.test(idNumber) || passport.test(idNumber);
}

// Tim hanh khach theo ma PNR
function findPassenger(pnrCode) {
    return passengers.findIndex(function (passenger) {
        return passenger.pnrCode === pnrCode;
    });
}

// Cap ghe con trong
function assignSeat(flightNumber) {
    for (let i = 0; i < seatList.length; i++) {
        let seat = seatList[i];

        let isUsed = passengers.some(function (passenger) {
            return passenger.flightNumber === flightNumber &&
                passenger.seatNumber === seat;
        });

        if (!isUsed) {
            return seat;
        }
    }

    return null;
}

// Hien thi danh sach hanh khach
function displayPassengers() {
    if (passengers.length === 0) {
        console.log("Chua co ho so hanh khach");
        return;
    }

    console.log("===== DANH SACH HANH KHACH =====");

    passengers.forEach(function (passenger) {
        console.log(
            passenger.pnrCode + " | " +
            passenger.passengerName + " | " +
            passenger.idNumber + " | " +
            passenger.flightNumber + " | " +
            passenger.seatNumber + " | " +
            (passenger.isCheckedIn ? "Da check-in" : "Chua check-in")
        );
    });
}

// Them ho so hanh khach
function addPassenger() {
    let pnrCode = prompt("Nhap ma PNR:");

    if (pnrCode === null || pnrCode.trim() === "") {
        console.log("Ma PNR khong duoc de trong");
        return;
    }

    pnrCode = pnrCode.trim().toUpperCase();

    if (findPassenger(pnrCode) !== -1) {
        console.log("Ma PNR da ton tai");
        return;
    }

    let passengerName = prompt("Nhap ho ten hanh khach:");

    if (passengerName === null || passengerName.trim() === "") {
        console.log("Ho ten khong duoc de trong");
        return;
    }

    passengerName = passengerName.trim();

    let idNumber = prompt("Nhap CCCD hoac so ho chieu:");

    if (idNumber === null || !validateId(idNumber.trim())) {
        console.log("Giay to khong hop le");
        console.log("CCCD gom 12 chu so hoac ho chieu gom 1 chu cai va 7-8 chu so");
        return;
    }

    idNumber = idNumber.trim().toUpperCase();

    let flightNumber = prompt("Nhap ma chuyen bay:");

    if (flightNumber === null || flightNumber.trim() === "") {
        console.log("Ma chuyen bay khong duoc de trong");
        return;
    }

    flightNumber = flightNumber.trim().toUpperCase();

    let seatNumber = assignSeat(flightNumber);

    if (seatNumber === null) {
        console.log("Chuyen bay da het ghe");
        return;
    }

    let passenger = {
        pnrCode: pnrCode,
        passengerName: passengerName,
        idNumber: idNumber,
        flightNumber: flightNumber,
        seatNumber: seatNumber,
        isCheckedIn: false
    };

    passengers.push(passenger);

    console.log("Them ho so thanh cong");
    console.log("So ghe duoc cap: " + seatNumber);
}

// In the len may bay
function printBoardingPass(passenger) {
    console.log("========================================");
    console.log("           BOARDING PASS");
    console.log("========================================");
    console.log("Ma PNR: " + passenger.pnrCode);
    console.log("Hanh khach: " + passenger.passengerName);
    console.log("Giay to: " + passenger.idNumber);
    console.log("Chuyen bay: " + passenger.flightNumber);
    console.log("So ghe: " + passenger.seatNumber);
    console.log("Trang thai: DA CHECK-IN");
    console.log("----------------------------------------");
    console.log("|| ||| | || |||| | ||| || | |||| ||");
    console.log("========================================");
}

// Check-in hanh khach
function checkInPassenger() {
    let pnrCode = prompt("Nhap ma PNR can check-in:");

    if (pnrCode === null || pnrCode.trim() === "") {
        console.log("Ma PNR khong hop le");
        return;
    }

    pnrCode = pnrCode.trim().toUpperCase();

    let index = findPassenger(pnrCode);

    if (index === -1) {
        console.log("Khong tim thay hanh khach");
        return;
    }

    let passenger = passengers[index];

    if (passenger.isCheckedIn) {
        console.log("Hanh khach da check-in truoc do");
        return;
    }

    if (!validateId(passenger.idNumber)) {
        console.log("Giay to khong hop le, khong the check-in");
        return;
    }

    let seatConflict = passengers.some(function (item) {
        return item.pnrCode !== passenger.pnrCode &&
            item.flightNumber === passenger.flightNumber &&
            item.seatNumber === passenger.seatNumber;
    });

    if (seatConflict) {
        console.log("So ghe bi trung tren chuyen bay");
        return;
    }

    passenger.isCheckedIn = true;

    console.log("Xac thuc giay to thanh cong");
    console.log("Check-in thanh cong");

    printBoardingPass(passenger);
}

// Tim hanh khach
function searchPassenger() {
    let pnrCode = prompt("Nhap ma PNR can tim:");

    if (pnrCode === null || pnrCode.trim() === "") {
        console.log("Ma PNR khong hop le");
        return;
    }

    pnrCode = pnrCode.trim().toUpperCase();

    let index = findPassenger(pnrCode);

    if (index === -1) {
        console.log("Khong tim thay hanh khach");
        return;
    }

    let passenger = passengers[index];

    console.log("===== THONG TIN HANH KHACH =====");
    console.log("Ma PNR: " + passenger.pnrCode);
    console.log("Ho ten: " + passenger.passengerName);
    console.log("Giay to: " + passenger.idNumber);
    console.log("Chuyen bay: " + passenger.flightNumber);
    console.log("So ghe: " + passenger.seatNumber);
    console.log("Da check-in: " + (passenger.isCheckedIn ? "Co" : "Chua"));
}

// Menu chinh
function main() {
    let choice;

    do {
        console.log("\n===== QUAN LY CHECK-IN SAN BAY =====");
        console.log("1. Them ho so hanh khach");
        console.log("2. Xem danh sach hanh khach");
        console.log("3. Check-in va in the");
        console.log("4. Tim hanh khach");
        console.log("5. Thoat");

        choice = prompt("Nhap lua chon tu 1 den 5:");

        if (choice === null) {
            choice = "5";
        }

        switch (choice.trim()) {
            case "1":
                addPassenger();
                break;

            case "2":
                displayPassengers();
                break;

            case "3":
                checkInPassenger();
                break;

            case "4":
                searchPassenger();
                break;

            case "5":
                console.log("Ket thuc chuong trinh");
                break;

            default:
                console.log("Lua chon khong hop le");
        }
    } while (choice.trim() !== "5");
}

main();