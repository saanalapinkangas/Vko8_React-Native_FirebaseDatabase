export const convertFirebaseTimeStampToJS = (time) => {
    if (time !== null && time !== undefined) {
        const firebaseTime = new Date(
            time.seconds * 1000 + time.nanoseconds / 1000000,
        );
        return firebaseTime.getDate() + '.' +
        (firebaseTime.getMonth() +1) + '.' +
        firebaseTime.getFullYear() + ' ' +
        firebaseTime.getHours() + '.' +
        String(firebaseTime.getMinutes()).padStart(2,'0') + '.' +
        String(firebaseTime.getSeconds()).padStart(2,'0');
    }
}