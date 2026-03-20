import "./styles/main.css";
import { renderHeader, initHeader } from "./components/header";
import { renderFooter } from "./components/footer";
import { initTheme } from "./theme";

document.querySelector<HTMLDivElement>("#header")!.innerHTML = renderHeader();
document.querySelector<HTMLDivElement>("#footer")!.innerHTML = renderFooter();

initTheme();
initHeader();
