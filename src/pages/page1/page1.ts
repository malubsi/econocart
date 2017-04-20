import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SocialSharingService } from "../../service/socialsharing/socialsharingservice";

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {

  constructor(public navCtrl: NavController, private sharingVar: SocialSharingService) {

  }

  whatsappShare() {
    this.sharingVar.whatsappShare();
  }


  twitterShare() {
    this.sharingVar.twitterShare();
  }

  public facebookShare() {
    this.sharingVar.facebookShare();
  }

  public otherShare() {
    this.sharingVar.otherShare();

  }



}
