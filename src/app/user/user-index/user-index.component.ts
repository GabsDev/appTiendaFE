import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-user-index",
  templateUrl: "./user-index.component.html",
  styleUrls: ["./user-index.component.scss"],
})
export class UserIndexComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.navigate(["/user/login"], { relativeTo: this.route });
  }
  ngOnInit(): void {}
}
