let inputTag = document.getElementById("name");
let certificateForm = document.getElementById("certificate-form");
let submit = document.getElementById('submit');

const capitalize = (str, lower = false) =>
  (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
    match.toUpperCase()
  );

certificateForm.addEventListener("submit", (e) => {
  e.preventDefault()
  let credentialUser = Math.ceil(Math.random() * 10000);
  let str = "Eduhub" + credentialUser.toString();
  const val = capitalize(certificateForm.userName.value.trim());
  // console.log(val);
  generetPdf(val, str);
  certificateForm.reset()
});


const generetPdf = async (name,cr)=>{
    const {PDFDocument,rgb} = PDFLib;

    const exBytes = await fetch("./Blockchain.pdf").then((res)=>{
        return res.arrayBuffer()
    });
    const exFont = await fetch('./Sanchez-Regular.ttf').then((res)=>{
        return res.arrayBuffer();
    })


    
    
    const pdfDoc = await PDFDocument.load(exBytes)
    
    pdfDoc.registerFontkit(fontkit);
    const myFont = await pdfDoc.embedFont(exFont);

    const pages = pdfDoc.getPages();
    const firstP = pages[0];

    const textSize = 25;
    const textWidth = myFont.widthOfTextAtSize(name, textSize);

    firstP.drawText(name, {
      x: firstP.getWidth() / 2 - textWidth / 2,
      y: 310,
      size: textSize,
      font: myFont,
      color: rgb(0, 0, 0),
    });

    firstP.drawText(cr,{
        x:550,
        y:65,
        size:15,
        font:myFont,
        color: rgb(0, 0.76, 0.8)
    })

    const uri = await pdfDoc.saveAsBase64({dataUri: true});
    saveAs(uri,"Eduhub_Certificate.pdf",{autoBom:true})
    // document.querySelector("#myPDF").src = uri;
};
