import { Route, Routes, BrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Main from "./pages/Main";
import About from "./pages/About";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { useSelector } from "react-redux";
import { selectMode } from "./stores/selectors/selectors";


export default function App() {
  // TODO:
  // mobile
  // more jokes
  // like/dislike
  // login/logout
  // profile
  // premium jokes
  // express admin
  // translations
  // ai generated punchline
  // redux
  // dockerize
  // fullstack deploy

  const mode = useSelector(selectMode)
  const darkTheme = createTheme({
    components: {
      MuiSwitch: {
        styleOverrides: {
          track: {
            backgroundColor: '#d3d3d3',
          }
        }
      }
    },
    palette: {
      mode: mode === 'dark' ? 'dark' : 'light',
      primary: { main: '#fAA50A'},
    }
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Main />} />
          <Route path='about' element={<About />} />
          <Route path='profile' element={<Profile />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

