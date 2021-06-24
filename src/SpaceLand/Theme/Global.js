import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: background 0.3s linear;
  }
  .service-btn:hover {
    background: ${({ theme }) => theme.servicebtn}
  }
  .container-password {
    background: ${({ theme }) => theme.body};
  }
  .delete-content {
    background: ${({ theme }) => theme.body};
  }
  .main-navbar {
    background: ${({ theme }) => theme.body};
  }
  .main-navbar-link {
    color: ${({ theme }) => theme.text};
  }
  .delete-input {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
  }
  .buy-btn {
    background: ${({ theme }) => theme.servicebtn}
  }
  .stage-item::before{
    color:#8C2B7A
  }
  .log-modal, .modal-quit {
    background: ${({ theme }) => theme.servicebtn};
  }
  .modal-input::placeholder {
    color: #8C2B7A;
  }
  .modal-input {
    background: ${({ theme }) => theme.servicebtn};
    color: #8C2B7A
  }
  .mobile-nav {
    background: ${({ theme }) => theme.body};
  }
  `;