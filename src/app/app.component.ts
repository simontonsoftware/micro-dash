import { Component } from "@angular/core";
import { kebabCase } from "micro-dash";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent {
  title = kebabCase("micro dash");
}
