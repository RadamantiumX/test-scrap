import readline from 'readline'



export async function helper() {
    
  try {
    const ATTRIBUTES = [
        "accept",
        "accept-charset",
        "accesskey",
        "action",
        "alt",
        "async",
        "autocomplete",
        "autofocus",
        "autoplay",
        "charset",
        "checked",
        "cite",
        "class",
        "cols",
        "colspan",
        "content",
        "contenteditable",
        "controls",
        "coords",
        "data",
        "data-*",
        "datetime",
        "default",
        "defer",
        "dir",
        "dirname",
        "disabled",
        "download",
        "draggable",
        "enctype",
        "enterkeyhint",
        "for",
        "form",
        "formaction",
        "headers",
        "height",
        "hidden",
        "high",
        "href",
        "hreflang",
        "http-equiv",
        "id",
        "inert",
        "inputmode",
        "ismap",
        "kind",
        "label",
        "lang",
        "list",
        "loop",
        "low",
        "max",
        "maxlength",
        "media",
        "method",
        "min",
        "multiple",
        "muted",
        "name",
        "novalidate",
        "onabort",
        "onafterprint",
        "onbeforeprint",
        "onbeforeunload",
        "onblur",
        "oncanplay",
        "oncanplaythrough",
        "onchange",
        "onclick",
        "oncontextmenu",
        "oncopy",
        "oncuechange",
        "oncut",
        "ondblclick",
        "ondrag",
        "ondragend",
        "ondragenter",
        "ondragleave",
        "ondragover",
        "ondragstart",
        "ondrop",
        "ondurationchange",
        "onemptied",
        "onended",
        "onerror",
        "onfocus",
        "onhashchange",
        "oninput",
        "oninvalid",
        "onkeydown",
        "onkeypress",
        "onkeyup",
        "onload",
        "onloadeddata",
        "onloadedmetadata",
        "onloadstart",
        "onmousedown",
        "onmousemove",
        "onmouseout",
        "onmouseover",
        "onmouseup",
        "onmousewheel",
        "onoffline",
        "ononline",
        "onpageshow",
        "onpaste",
        "onpause",
        "onplay",
        "onplaying",
        "onprogress",
        "onratechange",
        "onreset",
        "onresize",
        "onscroll",
        "onsearch",
        "onseeked",
        "onseeking",
        "onselect",
        "onstalled",
        "onsubmit",
        "onsuspend",
        "ontimeupdate",
        "ontoggle",
        "onunload",
        "onvolumechange",
        "onwaiting",
        "onwheel",
        "open",
        "optimum",
        "pattern",
        "placeholder",
        "popover",
        "popovertarget",
        "popovertargetaction",
        "poster",
        "preload",
        "readonly",
        "rel",
        "required",
        "reversed",
        "rows",
        "rowspan",
        "sandbox",
        "scope",
        "selected",
        "shape",
        "size",
        "sizes",
        "span",
        "&lt;col&gt;",
        "&lt;colgroup&gt;",
        "spellcheck",
        "src",
        "srcdoc",
        "srclang",
        "srcset",
        "start",
        "step",
        "style",
        "tabindex",
        "target",
        "title",
        "translate",
        "type",
        "usemap",
        "value",
        "width",
        "wrap",
        "accesskey",
        "class",
        "contenteditable",
        "data-*",
        "dir",
        "draggable",
        "enterkeyhint",
        "hidden",
        "id",
        "inert",
        "inputmode",
        "lang",
        "popover",
        "spellcheck",
        "style",
        "tabindex",
        "title",
        "translate"
    ]
    const propmterSelector = prompt("Inserte the HTML selector", "");
    if (propmterSelector.length === 0) {
      throw alert("Empty field... please, close the browser...");
    }

    const attr = prompt("Que atributo desea obtener", "");
    if (propmterSelector.length === 0) {
      throw alert("Empty field... please, close the browser...");
    }
    console.log(typeof attr)
    const blurArray = [];
    const content = document.querySelectorAll(propmterSelector);

    if ([...content].length === 0) {
     throw alert("Selector invalid... please, close the browser");
    }
    for (let i = 0; i < [...content].length; i++) {
      if ([...content][i].getAttribute(attr) === null) {
        blurArray.push({ response: "missing attribute" });
      }
      
        const source = { attr: [...content][i].getAttribute(attr),  type: ATTRIBUTES[0] };
        blurArray.push(source);
     
    }

    return blurArray;
  } catch (error) {
    console.error(error)
  }
}


export function readlineConsole(params) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  let values = []; // Array to store the values

  return {rl, values}
}