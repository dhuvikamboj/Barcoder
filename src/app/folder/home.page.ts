import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SocketServiceService } from "../socket-service.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  public folder: string;
  public ipaddresses: Array<any>;
  constructor(
    private activatedRoute: ActivatedRoute,
    private socket: SocketServiceService
  ) {}
  ionViewDidEnter() {}
  ngOnInit() {
    this.socket.getMessage("ipaddress").subscribe((data) => {
      this.ipaddresses = JSON.parse(data);
      console.log(this.ipaddresses);
      
    });
    this.socket.sendMessage("ipaddress", '{"type":"get"}');
    // this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }
}
