import { Provider } from "react-redux";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { LoginPage } from "../auth/pages/LoginPage";
import { CalendarPage } from "../calendar/pages/CalendarPage";
import { store } from "../store";

export const AppRouter = () => {
  const authStatus = "autenticated";

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {authStatus === "not-autenticated" ? (
            <Route path="/auth/*" element={<LoginPage />} />
          ) : (
            <Route path="/*" element={<CalendarPage />} />
          )}

          <Route path="/*" element={<Navigate to="/auth/login" />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};
