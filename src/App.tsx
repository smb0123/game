import { GamePlayPage } from "@/pages/GamePlayPage";
import { GameSettingsPage } from "@/pages/GameSettingsPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

/**
 * 메인 앱 컴포넌트
 * React Router를 사용하여 페이지 라우팅을 관리합니다.
 */
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* 기본 경로는 게임 설정 페이지로 리다이렉트 */}
          <Route path="/" element={<GameSettingsPage />} />
          {/* 게임 플레이 페이지 */}
          <Route path="/game" element={<GamePlayPage />} />
          {/* 존재하지 않는 경로는 게임 설정 페이지로 리다이렉트 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
