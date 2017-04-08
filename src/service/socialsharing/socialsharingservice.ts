import { SocialSharing } from "@ionic-native/social-sharing";
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';



@Injectable()
export class SocialSharingService {
    constructor(private sharingVar: SocialSharing) {
    }
    public whatsappShare() {
        this.sharingVar.shareViaWhatsApp("O Econocart me ajudou a achar a lista de compra mais barata, baixe você também e venha economizar.", null /*Image*/, "https://play.google.com/store/apps?hl=pt" /* url */)
            .then(() => {
                alert("Success");
            },
            () => {
                alert("failed")
            })
    }

    public twitterShare() {
        this.sharingVar.shareViaTwitter("Message via Twitter", null /*Image*/, "http://pointdeveloper.com")
            .then(() => {
                alert("Success");
            },
            () => {
                alert("failed")
            })
    }

    public facebookShare() {
        this.sharingVar.shareViaFacebook("Message via Twitter", null /*Image*/, "http://pointdeveloper.com")
            .then(() => {
                alert("Success");
            },
            () => {
                alert("failed")
            })
    }

    public otherShare() {
        this.sharingVar.share("Genral Share Sheet", null/*Subject*/, null/*File*/, "http://pointdeveloper.com")
            .then(() => {
                alert("Success");
            },
            () => {
                alert("failed")
            })

    }

}


