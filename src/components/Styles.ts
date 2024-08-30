export function Styles() {
  const styles = `
      .menu-root {
        font-family: 'IBM Plex Sans', sans-serif;
        font-size: 0.875rem;
        box-sizing: border-box;
        padding: 5px;
        margin: 10px 0;
        min-width: 200px;
        background: #fff;
        border: 1px solid ${grey[200]};
        border-radius: 0.75em;
        color: ${grey[900]};
        overflow: auto;
        outline: 0;
        box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.05);
      }
  
      .mode-dark .menu-root {
        background: ${grey[900]};
        border-color: ${grey[700]};
        color: ${grey[300]};
        box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.5);
      }
  
      .menu-item {
        list-style: none;
        padding: 8px;
        border-radius: 0.45em;
        cursor: default;
        user-select: none;
      }
  
      .menu-item:last-of-type {
        border-bottom: none;
      }
  
      .menu-item:focus {
        background-color: ${grey[100]};
        color: ${grey[900]};
        outline: 0;
      }
  
      .mode-dark .menu-item:focus {
        background-color: ${grey[800]};
        color: ${grey[300]};
      }
  
      .menu-item.disabled {
        color: ${grey[400]};
      }
  
    .mode-dark .menu-item.disabled {
      color: ${grey[700]};
    }
  
      .button {
        font-family: 'IBM Plex Sans', sans-serif;
        font-weight: 600;
        font-size: 0.875rem;
        line-height: 1.5;
        padding: 8px 16px;
        border-radius: 8px;
        color: white;
        transition: all 150ms ease;
        cursor: pointer;
        background: "#fff";
        border: 1px solid grey[200];
        color: grey[900];
        box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  
        &:hover {
          background: grey[50];
          border-color: grey[300];
        }
  
        &:active {
          background: grey[100];
        }
  
        &:focus-visible {
          box-shadow: 0 0 0 4px blue[200];
          outline: none;
        }
      }
    `;

  return <style dangerouslySetInnerHTML={{ __html: styles }} />;
}
