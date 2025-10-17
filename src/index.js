import App from "./App.js";

//애플리케이션 진입점
//App.js의 App 클래스를 import하여 인스턴스를 생성하고, app.run()을 호출해 실제 애플리케이션을 시작하는 역할
const app = new App();
await app.run();
