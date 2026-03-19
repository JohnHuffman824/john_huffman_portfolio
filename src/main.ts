import "./styles/main.css";
import { renderHeader } from "./components/header";
import { renderFooter } from "./components/footer";

document.querySelector<HTMLDivElement>("#header")!.innerHTML = renderHeader();
document.querySelector<HTMLDivElement>("#footer")!.innerHTML = renderFooter();
