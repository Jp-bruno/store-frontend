import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

const StyledAppBar = styled.div`
  background-color: #444;
  padding: 0;
  padding-inline: 100px;

  .nav-ul {
    display: flex;
    list-style-type: none;
    margin: 0;
    padding: 20px 0;
    height: 63px;
    width: 100%;

    .login-li {
      margin-left: auto;
    }

    .nav-link {
      padding: 20px;

      &.login {
        border: solid 1px green;
      }

      &.is-current-page {
        background-color: #555;
      }

      &:hover {
        background-color: #666;
      }
    }
  }
`;

export default function AppBar() {
  const { pathname } = useRouter();

  return (
    <StyledAppBar>
      <nav>
        <ul className="nav-ul">
          <li>
            <Link
              href="/"
              className={`nav-link ${pathname === '/' ? 'is-current-page' : ''}`}
            >
              Home
            </Link>
          </li>
          {/* 
          <li>
            <Link
              href="#"
              className="nav-link"
              onClick={(ev) => {
                ev.preventDefault();
                console.log("ok");
              }}
            >
              Cart
            </Link>
          </li> */}

          <li className="login-li">
            <Link
              href="#"
              className="nav-link"
            >
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </StyledAppBar>
  );
}
