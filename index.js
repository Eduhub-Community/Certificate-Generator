let name = document.getElementById('name');
let submit = document.getElementById('submit');
submit.addEventListener('click',()=>{
    let credentialUser = Math.ceil(Math.random()*10000);
    let str = "Eduhub"+credentialUser.toString();
    generetPdf(name.value,str);
    name.value = '';
})


const generetPdf = async (name,cr)=>{
    const {PDFDocument,rgb} = PDFLib;

    const exBytes = await fetch("./sample.pdf").then((res)=>{
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
    firstP.drawText(name,{
        x:300,
        y:310,
        size:25,
        font:myFont,
        color: rgb(0, 0, 0)
    })

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