/**
 * Blocking inline script that applies the "dark" class on <html> before
 * first paint, preventing a flash of wrong theme. Must be placed in <head>.
 */
export default function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: [
          `(function(){`,
          `try{`,
          `var t=localStorage.getItem("dreama-theme");`,
          `var d=t==="dark"||(t!=="light"&&matchMedia("(prefers-color-scheme:dark)").matches);`,
          `if(d)document.documentElement.classList.add("dark")`,
          `}catch(e){}`,
          `})()`,
        ].join(""),
      }}
    />
  );
}
