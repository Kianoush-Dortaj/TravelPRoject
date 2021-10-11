
export default new class UtilService {


    constructor() { }

    playAudio() {
        let audio = new Audio();
        audio.src = './../../../assets/audio/notification.wav';
        audio.load();
        audio.play();
    }



}