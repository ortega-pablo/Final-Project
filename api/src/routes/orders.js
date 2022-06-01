const { Router } = require("express");
const { Product, User, Review, Order, ShoppingCart, Image, Address } = require("../db");
const router = Router();
const Stripe = require("stripe");
const { KEY_STRIPE } = process.env
const stripe = new Stripe(KEY_STRIPE);
const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN } = process.env;
const { google } = require("googleapis");
const { Op } = require("sequelize");
const nodemailer = require("nodemailer");



router.post("/review", async (req, res, next) => {
  const { rating, review, orderId } = req.body;
  const { userId, productId } = req.query;
  try {

    const product = await Product.findOne({
      where: {
        id: productId,
      },
    });

    const user = await User.findOne({
      where: {
        id: userId,
      },
    })

    const newReview = await Review.create({
      rating,
      review,
      orderId,
    })

    newReview.setUser(user);
    newReview.setProduct(product);

    return res.status(200).send(newReview);

  } catch (error) {
    next(error);
  }
});





router.post('/', async (req, res, next) => {

  const { userId, addressId } = req.query;
  const { id, amount, state, address, email } = req.body;

  try {


    if (true) {

      const findUser = await User.findOne({
        where: {
          id: userId
        }, include: { 
          model: Address,
          where: {
            id: addressId
          }
        }
      });

      console.log(findUser)



      const findCart = await ShoppingCart.findOne({
        where: {
          userId
        },
        include: {
          model: Product,
          through: {
            attributes: []
          },
          include: {
            model: Image,
            attributes: ["urlFile"],
            through: {
              attributes: []
            }
          }
        }
      });

      console.log(findCart)


      const newOrder = await Order.create({
        total: findCart.amount,
        state,
        quantity: findCart.amount
      });
 
      const oneAddress = findUser.addresses[0] 

      oneAddress.addOrder(newOrder);
      newOrder.setUser(userId);
      newOrder.addProducts(findCart.products); // O un findAll.length porque la neta esta cabron

      
      var outputHTML = "";
      outputHTML += "<table style=\"mso-table-lspace:0pt; mso-table-rspace:0pt; border-collapse:collapse;border-spacing:0px;width:500px\" class=\"cke_show_border\" cellspacing=\"1\" cellpadding=\"1\" border=\"0\" align=\"left\" role=\"presentation\">"

    
      for(var i = 0; i < findCart.products.length; i++){

        outputHTML += "<tr style=\"border-collapse:collapse\">";

        outputHTML += `<td style=\"padding:5px 10px 5px 0; Margin:0\" width=\"80%\" align=\"left\"> <p style=\"Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:\'open sans\', \'helvetica neue\', helvetica, arial, sans-serif;line-height:24px;color:#333333;font-size:16px\">${findCart.products[i].name}</p></td>


        <td style =\"padding:5px 0;Margin:0\" width=\"20%\" align=\"left\"><p style=\"Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:\'open sans\', \'helvetica neue\', helvetica, arial, sans-serif;line-height:24px;color:#333333;font-size:16px\">$${findCart.products[i].price}</p></td>`

        outputHTML += "</tr>"
        }

        outputHTML += "</table>"
        
         
      let info = await transporter.sendMail({
        from: '"Exmine Store" <samueltribulon@hotmail>', // sender address
        to: [findUser.email], // list of receivers 
        subject: "Confirmacion de Pedido", // Subject line
        text: "", // plain text body
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="width:100%;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
        <head>
        <link type="text/css" rel="stylesheet" id="dark-mode-custom-link">
        <link type="text/css" rel="stylesheet" id="dark-mode-general-link">
        <link type="text/css" rel="stylesheet" id="dark-mode-custom-link">
        <link type="text/css" rel="stylesheet" id="dark-mode-general-link">
        <link type="text/css" rel="stylesheet" id="dark-mode-custom-link">
        <link type="text/css" rel="stylesheet" id="dark-mode-general-link">
        <meta charset="UTF-8">
        <meta content="width=device-width, initial-scale=1" name="viewport">
        <meta name="x-apple-disable-message-reformatting">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta content="telephone=no" name="format-detection">
        <title>Confirmacion de Orden</title><!--[if (mso 16)]>
        <style type="text/css">
        a {text-decoration: none;}
        </style>
        <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
        <xml>
        <o:OfficeDocumentSettings>
        <o:AllowPNG></o:AllowPNG>
        <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
        </xml>
        <![endif]--><!--[if !mso]><!-- -->
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700,700i" rel="stylesheet"><!--<![endif]-->
        <style type="text/css">
        #outlook a {
        padding:0;
        }
        .ExternalClass {
        width:100%;
        }
        .ExternalClass,
        .ExternalClass p,
        .ExternalClass span,
        .ExternalClass font,
        .ExternalClass td,
        .ExternalClass div {
        line-height:100%;
        }
        .es-button {
        mso-style-priority:100!important;
        text-decoration:none!important;
        }
        a[x-apple-data-detectors] {
        color:inherit!important;
        text-decoration:none!important;
        font-size:inherit!important;
        font-family:inherit!important;
        font-weight:inherit!important;
        line-height:inherit!important;
        }
        .es-desk-hidden {
        display:none;
        float:left;
        overflow:hidden;
        width:0;
        max-height:0;
        line-height:0;
        mso-hide:all;
        }
        [data-ogsb] .es-button {
        border-width:0!important;
        padding:15px 30px 15px 30px!important;
        }
        @media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120%!important } h1 { font-size:32px!important; text-align:center } h2 { font-size:26px!important; text-align:center } h3 { font-size:20px!important; text-align:center } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:32px!important } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px!important } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important } .es-menu td a { font-size:16px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:16px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:16px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:16px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:inline-block!important } a.es-button, button.es-button { font-size:16px!important; display:inline-block!important; border-width:15px 30px 15px 30px!important } .es-btn-fw { border-width:10px 0px!important; text-align:center!important } .es-adaptive table, .es-btn-fw, .es-btn-fw-brdr, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } }
        </style>
        </head>
        <body style="width:100%;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
        <div class="es-wrapper-color" style="background-color:#EEEEEE"><!--[if gte mso 9]>
        <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
        <v:fill type="tile" color="#eeeeee"></v:fill>
        </v:background>
        <![endif]-->
        <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top">
        <tr style="border-collapse:collapse">
        <td valign="top" style="padding:0;Margin:0">
        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
        <tr style="border-collapse:collapse">
        <td align="center" style="padding:0;Margin:0">
        <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" cellspacing="0" cellpadding="0" align="center">
        <tr style="border-collapse:collapse">
        <td align="left" style="Margin:0;padding-left:10px;padding-right:10px;padding-top:15px;padding-bottom:15px"><!--[if mso]><table style="width:580px" cellpadding="0" cellspacing="0"><tr><td style="width:282px" valign="top"><![endif]-->
        <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
        <tr style="border-collapse:collapse">
        <td align="left" style="padding:0;Margin:0;width:282px">
        <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
        <tr style="border-collapse:collapse">
      
        </tr>
        </table></td>
        </tr>
        </table><!--[if mso]></td></tr></table><![endif]--></td>
        </tr>
        </table></td>
        </tr>
        </table>
        <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
        <tr style="border-collapse:collapse"></tr>
        <tr style="border-collapse:collapse">
        <td align="center" style="padding:0;Margin:0">
        <table class="es-header-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#044767;width:600px" cellspacing="0" cellpadding="0" bgcolor="#044767" align="center">
        <tr style="border-collapse:collapse">
        <td align="left" bgcolor="#b6893e" style="padding:0;Margin:0;padding-top:20px;padding-left:35px;padding-right:35px;background-color:#b6893e">
        <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
        <tr style="border-collapse:collapse">
        <td align="center" valign="top" style="padding:0;Margin:0;width:530px">
        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
        <tr style="border-collapse:collapse">
        <td align="left" style="padding:0;Margin:0"><a name="https://final-project-dun.vercel.app/" href="" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#FFFFFF;font-size:14px"></a><h1 style="Margin:0;line-height:43px;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;font-size:36px;font-style:normal;font-weight:bold;color:#ffffff;text-align:center">Logo Exmine</h1><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#FFFFFF;font-size:14px"><br></p></td>
        </tr>
        </table></td>
        </tr>
        </table></td>
        </tr>
        </table></td>
        </tr>
        </table>
        <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
        <tr style="border-collapse:collapse">
        <td align="center" style="padding:0;Margin:0">
        <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
        <tr style="border-collapse:collapse">
        <td align="left" style="padding:0;Margin:0;padding-left:35px;padding-right:35px;padding-top:40px">
        <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
        <tr style="border-collapse:collapse">
        <td valign="top" align="center" style="padding:0;Margin:0;width:530px">
        <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
        <tr style="border-collapse:collapse">
        <td align="center" style="Margin:0;padding-top:25px;padding-bottom:25px;padding-left:35px;padding-right:35px;font-size:0px"><img src="https://vitddo.stripocdn.email/content/guids/CABINET_4652c0ad302f6bcc2eca28be33a41235/images/eo_circle_green_checkmarksvg.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="120"></td>
        </tr>
        <tr style="border-collapse:collapse">
        <td align="center" style="padding:0;Margin:0;padding-bottom:10px"><h2 style="Margin:0;line-height:34px;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;font-size:28px;font-style:normal;font-weight:bold;color:#333333">Hola ${findUser.firstName}, gracias&nbsp;por tu orden!</h2></td>
        </tr>
        </table></td>
        </tr>
        </table></td>
        </tr>
        </table></td>
        </tr>
        </table>
        <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
        <tr style="border-collapse:collapse">
        <td align="center" style="padding:0;Margin:0">
        <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
        <tr style="border-collapse:collapse">
        <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:35px;padding-right:35px">
        <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
        <tr style="border-collapse:collapse">
        <td valign="top" align="center" style="padding:0;Margin:0;width:530px">
        <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
        <tr style="border-collapse:collapse">
        <td bgcolor="#eeeeee" align="left" style="Margin:0;padding-top:10px;padding-bottom:10px;padding-left:10px;padding-right:10px">
        <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:500px" class="cke_show_border" cellspacing="1" cellpadding="1" border="0" align="left" role="presentation">
        <tr style="border-collapse:collapse">
        <td width="80%" style="padding:0;Margin:0"><h4 style="Margin:0;line-height:120%;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif">Número de orden:&nbsp;</h4></td>
        <td width="20%" style="padding:0;Margin:0"><h4 style="Margin:0;line-height:120%;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif">${newOrder.id}</h4></td>
        </tr>
        </table></td>
        </tr>
        </table></td>
        </tr>
        </table></td>
        </tr>
        <tr style="border-collapse:collapse">
        <td align="left" style="padding:0;Margin:0;padding-left:35px;padding-right:35px">
        <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
        <tr style="border-collapse:collapse">
        <td valign="top" align="center" style="padding:0;Margin:0;width:530px">
        <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
        <tr style="border-collapse:collapse">
        <td align="left" style="Margin:0;padding-top:10px;padding-bottom:10px;padding-left:10px;padding-right:10px">
        <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:500px" class="cke_show_border" cellspacing="1" cellpadding="1" border="0" align="left" role="presentation">
        <tr style="border-collapse:collapse">
        <td style="padding:5px 10px 5px 0;Margin:0" width="80%" align="left"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#333333;font-size:16px"><strong>Articulos:</strong></p></td>
        <td style="padding:5px 0;Margin:0" width="20%" align="left"><strong>${newOrder.quantity}</strong></td>
        </tr>
        <tr style="border-collapse:collapse">
        <td style="padding:5px 10px 5px 0;Margin:0" width="80%" align="left"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#333333;font-size:16px">Envio</p></td>
        <td style="padding:5px 0;Margin:0" width="20%" align="left"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#333333;font-size:16px">$10.00</p></td>
        </tr>
        <tr style="border-collapse:collapse">
        <td style="padding:5px 10px 5px 0;Margin:0" width="80%" align="left"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#333333;font-size:16px"><br></p></td>
        <td style="padding:5px 0;Margin:0" width="20%" align="left"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#333333;font-size:16px"><br></p></td>
        </tr>
        </table></td>
        </tr>
        <tr style="border-collapse:collapse">
        <td align="left" style="Margin:0;padding-top:10px;padding-bottom:10px;padding-left:10px;padding-right:10px">
      
      
        <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:500px" class="cke_show_border" cellspacing="1" cellpadding="1" border="0" align="left" role="presentation">
      
        ${outputHTML} 
             
        
        </td >
        </tr > 
        </table ></td >
        </tr >
        </table ></td >
        </tr >
        <tr style="border-collapse:collapse">
        <td align="left" style="padding:0;Margin:0;padding-top:10px;padding-left:35px;padding-right:35px">
        <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
        <tr style="border-collapse:collapse">
        <td valign="top" align="center" style="padding:0;Margin:0;width:530px">
        <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;border-top:3px solid #eeeeee;border-bottom:3px solid #eeeeee" width="100%" cellspacing="0" cellpadding="0" role="presentation">
        <tr style="border-collapse:collapse">
        <td align="left" style="Margin:0;padding-left:10px;padding-right:10px;padding-top:15px;padding-bottom:15px">
        <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:500px" class="cke_show_border" cellspacing="1" cellpadding="1" border="0" align="left" role="presentation">
        <tr style="border-collapse:collapse">
        <td width="80%" style="padding:0;Margin:0"><h4 style="Margin:0;line-height:120%;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif">TOTAL</h4></td>
        <td width="20%" style="padding:0;Margin:0"><h4 style="Margin:0;line-height:120%;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif">${newOrder.total}</h4></td>
        </tr>
        </table></td>
        </tr>
        </table></td>
        </tr>
        </table></td>
        </tr>
        <tr style="border-collapse:collapse">
        <td align="left" style="Margin:0;padding-left:35px;padding-right:35px;padding-top:40px;padding-bottom:40px"><!--[if mso]><table style="width:530px" cellpadding="0" cellspacing="0"><tr><td style="width:255px" valign="top"><![endif]-->
        <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
        <tr style="border-collapse:collapse">
        <td class="es-m-p20b" align="left" style="padding:0;Margin:0;width:255px">
        <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
        <tr style="border-collapse:collapse">
        <td align="left" style="padding:0;Margin:0;padding-bottom:15px"><h4 style="Margin:0;line-height:120%;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif">Dirección de envio:</h4></td>
        </tr>
        <tr style="border-collapse:collapse">
        <td align="left" style="padding:0;Margin:0;padding-bottom:10px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#333333;font-size:16px">${findUser.addresses[0].addressLine1}, ${findUser.addresses[0].addressLine2}, ${findUser.addresses[0].postalCode}, ${findUser.addresses[0].telephone}</p></td>
        </tr>
        </table></td>
        </tr>
        </table><!--[if mso]></td><td style="width:20px"></td><td style="width:255px" valign="top"><![endif]-->
        <table class="es-right" cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
        <tr style="border-collapse:collapse">
        <td align="left" style="padding:0;Margin:0;width:255px">
        <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
        <tr style="border-collapse:collapse">
        <td align="left" style="padding:0;Margin:0;padding-bottom:15px"><h4 style="Margin:0;line-height:120%;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif">Fecha programada de entrega:</h4></td>
        </tr>
        <tr style="border-collapse:collapse">
        <td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#333333;font-size:16px">January 1st, 2016</p></td>
        </tr>
        </table></td>
        </tr>
        </table><!--[if mso]></td></tr></table><![endif]--></td>
        </tr>
        </table ></td >
        </tr >
        </table >
        <table cellpadding="0" cellspacing="0" class="es-footer" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
        <tr style="border-collapse:collapse">
        <td align="center" style="padding:0;Margin:0">
        <table class="es-footer-body" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
        <tr style="border-collapse:collapse">
        <td align="left" bgcolor="#b6893e" style="padding:0;Margin:0;padding-top:35px;padding-left:35px;padding-right:35px;background-color:#b6893e">
        <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
        <tr style="border-collapse:collapse">
        <td valign="top" align="center" style="padding:0;Margin:0;width:530px">
        <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
        <tr style="border-collapse:collapse">
        <td align="center" style="padding:0;Margin:0;padding-bottom:35px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#333333;font-size:14px">Todos los derechos reservados</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#333333;font-size:14px">Copyright ©&nbsp;<a href="https://final-project-dun.vercel.app/about" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#333333;font-size:14px">EXMINE</a>&nbsp;2022.</p></td>
        </tr>
        </table></td>
        </tr>
        </table></td>
        </tr>
        </table></td>
        </tr>
        </table>
        <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
        <tr style="border-collapse:collapse">
        <td align="center" style="padding:0;Margin:0">
        <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" cellspacing="0" cellpadding="0" align="center">
        <tr style="border-collapse:collapse">
        <td align="left" style="Margin:0;padding-left:20px;padding-right:20px;padding-top:30px;padding-bottom:30px">
        <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
        <tr style="border-collapse:collapse">
        <td valign="top" align="center" style="padding:0;Margin:0;width:560px">
        <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
        <tr style="border-collapse:collapse">
        <td class="es-infoblock made_with" align="center" style="padding:0;Margin:0;line-height:120%;font-size:0;color:#CCCCCC"><a target="_blank" href="https://viewstripo.email/?utm_source=templates&utm_medium=email&utm_campaign=accessory&utm_content=trigger_newsletter3" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#CCCCCC;font-size:12px"><img src="https://vitddo.stripocdn.email/content/guids/CABINET_9df86e5b6c53dd0319931e2447ed854b/images/64951510234941531.png" alt width="125" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a></td>
        </tr>
        </table></td>
        </tr>
        </table></td>
        </tr>
        </table></td>
        </tr>
        </table></td >
        </tr >
        </table >
        </div >
        </body >
        </html >`
      });

      // await findCart.setProducts([]);
      // await findCart.update({
      //   amount: 0
      // });

      return res.send(newOrder)
      // return res.send("Order created successfully!")

    } else {
      return res.send("Payment error");
    }

  } catch (error) {
    next(error)
  }
})



router.get("/", async (req, res, next) => {

  const { orderId, userId } = req.query

  try {
    if (orderId) {

      const getOrder = await Order.findOne({
        where: {
          id: orderId
        },
        include: [
          {
            model: Product,
            attributes: ["id", "name", "price"],
            through: {
              attributes: []
            },
            include: {
              model: Image,
              attributes: ["urlFile"],
              through: {
                attributes: []
              }
            },
          },
          {
            model: Address,
            as: "order_address"
          }
        ]
      })

      return res.send(getOrder)

    } else if (userId) {

      const getUserOrders = await Order.findAll({
        where: {
          userId
        },
        include: [
          {
            model: Product,
            attributes: ["id", "name", "price"],
            through: {
              attributes: []
            },
            include: {
              model: Image,
              attributes: ["urlFile"],
              through: {
                attributes: []
              }
            }
          },
        {
          model: Address,
          as: "order_address"
        }
          
        ]
      })

      return res.send(getUserOrders)

    } else {

      const getAllOrders = await Order.findAll({
        include: {
          model: Product,
          attributes: ["id", "name", "price"],
          through: {
            attributes: []
          },
          include: {
            model: Image,
            attributes: ["urlFile"],
            through: {
              attributes: []
            }
          }
        }
      })

      return res.send(getAllOrders)
    }

  } catch (error) {
    next(error)
  }
})

router.put("/admin", async (req, res, next) => {

  const { userId, orderId } = req.query;
  const { state } = req.body

  try {

    const oAuth2Client = new google.auth.OAuth2(
      CLIENT_ID,
      CLIENT_SECRET,
      REDIRECT_URI
    );

    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

    const accessToken = await oAuth2Client.getAccessToken();
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: "exmine.hardware@gmail.com",
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: accessToken,
        },
      });



    if (userId && orderId) {

      const getAdmin = await User.findOne({ 
        where: {
          [Op.and]: [
            { id: userId },
            { role: 'admin' }
          ]
        }
      });

      const getOrder = await Order.findOne({
        where: {
          id: orderId
        },
        include: [
          {
            model: Product,
            attributes: ["id", "name", "price"],
            through: {
              attributes: []
            },
            include: {
              model: Image,
              attributes: ["urlFile"],
              through: {
                attributes: []
              }
            },
          },
          {
            model: Address,
            as: "order_address"
          }
        ]
      });


      const findUser = await User.findOne({
        where: {
          id: getOrder.userId
        }
      });

      if (getAdmin && getOrder) {

      var outputHTML = "";
      outputHTML += "<table style=\"mso-table-lspace:0pt; mso-table-rspace:0pt; border-collapse:collapse;border-spacing:0px;width:500px\" class=\"cke_show_border\" cellspacing=\"1\" cellpadding=\"1\" border=\"0\" align=\"left\" role=\"presentation\">"

      for(var i = 0; i < getOrder.products.length; i++){

        outputHTML += "<tr style=\"border-collapse:collapse\">";
        outputHTML += `<td style=\"padding:5px 10px 5px 0; Margin:0\" width=\"80%\" align=\"left\"> <p style=\"Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:\'open sans\', \'helvetica neue\', helvetica, arial, sans-serif;line-height:24px;color:#333333;font-size:16px\">${getOrder.products[i].name}</p></td>
        <td style =\"padding:5px 0;Margin:0\" width=\"20%\" align=\"left\"><p style=\"Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:\'open sans\', \'helvetica neue\', helvetica, arial, sans-serif;line-height:24px;color:#333333;font-size:16px\">$${getOrder.products[i].price}</p></td>`
        outputHTML += "</tr>"
        }
        outputHTML += "</table>"

        if(state === "processing") {

          await getOrder.update({
            state,
          })

          let info = await transporter.sendMail({
            from: '"Exmine Store" <exmine.store@hotmail.com>', // sender address
            to: [findUser.email], // list of receivers
            subject: "Actualización de Pedido", // Subject line
            text: "", // plain text body
            html:  `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="width:100%;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
            <head>
            <link type="text/css" rel="stylesheet" id="dark-mode-custom-link">
            <link type="text/css" rel="stylesheet" id="dark-mode-general-link">
            <link type="text/css" rel="stylesheet" id="dark-mode-custom-link">
            <link type="text/css" rel="stylesheet" id="dark-mode-general-link">
            <link type="text/css" rel="stylesheet" id="dark-mode-custom-link">
            <link type="text/css" rel="stylesheet" id="dark-mode-general-link">
            <link type="text/css" rel="stylesheet" id="dark-mode-custom-link">
            <link type="text/css" rel="stylesheet" id="dark-mode-general-link">
            <meta charset="UTF-8">
            <meta content="width=device-width, initial-scale=1" name="viewport">
            <meta name="x-apple-disable-message-reformatting">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta content="telephone=no" name="format-detection">
            <title>Orden en Proceso</title><!--[if (mso 16)]>
            <style type="text/css">
            a {text-decoration: none;}
            </style>
            <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
            <xml>
            <o:OfficeDocumentSettings>
            <o:AllowPNG></o:AllowPNG>
            <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
            </xml>
            <![endif]--><!--[if !mso]><!-- -->
            <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700,700i" rel="stylesheet"><!--<![endif]-->
            <style type="text/css">
            #outlook a {
            padding:0;
            }
            .ExternalClass {
            width:100%;
            }
            .ExternalClass,
            .ExternalClass p,
            .ExternalClass span,
            .ExternalClass font,
            .ExternalClass td,
            .ExternalClass div {
            line-height:100%;
            }
            .es-button {
            mso-style-priority:100!important;
            text-decoration:none!important;
            }
            a[x-apple-data-detectors] {
            color:inherit!important;
            text-decoration:none!important;
            font-size:inherit!important;
            font-family:inherit!important;
            font-weight:inherit!important;
            line-height:inherit!important;
            }
            .es-desk-hidden {
            display:none;
            float:left;
            overflow:hidden;
            width:0;
            max-height:0;
            line-height:0;
            mso-hide:all;
            }
            [data-ogsb] .es-button {
            border-width:0!important;
            padding:15px 30px 15px 30px!important;
            }
            @media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120%!important } h1 { font-size:32px!important; text-align:center } h2 { font-size:26px!important; text-align:center } h3 { font-size:20px!important; text-align:center } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:32px!important } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px!important } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important } .es-menu td a { font-size:16px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:16px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:16px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:16px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:inline-block!important } a.es-button, button.es-button { font-size:16px!important; display:inline-block!important; border-width:15px 30px 15px 30px!important } .es-btn-fw { border-width:10px 0px!important; text-align:center!important } .es-adaptive table, .es-btn-fw, .es-btn-fw-brdr, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } }
            </style>
            </head>
            <body style="width:100%;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
            <div class="es-wrapper-color" style="background-color:#EEEEEE"><!--[if gte mso 9]>
            <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
            <v:fill type="tile" color="#eeeeee"></v:fill>
            </v:background>
            <![endif]-->
            <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top">
            <tr style="border-collapse:collapse">
            <td valign="top" style="padding:0;Margin:0">
            <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
            <tr style="border-collapse:collapse">
            <td align="center" style="padding:0;Margin:0">
            <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" cellspacing="0" cellpadding="0" align="center">
            <tr style="border-collapse:collapse">
            <td align="left" style="Margin:0;padding-left:10px;padding-right:10px;padding-top:15px;padding-bottom:15px"><!--[if mso]><table style="width:580px" cellpadding="0" cellspacing="0"><tr><td style="width:282px" valign="top"><![endif]-->
            <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
            <tr style="border-collapse:collapse">
            <td align="left" style="padding:0;Margin:0;width:282px">
            <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr style="border-collapse:collapse">
            <td class="es-infoblock es-m-txt-c" align="left" style="padding:0;Margin:0;line-height:14px;font-size:12px;color:#CCCCCC"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica\ neue', helvetica, sans-serif;line-height:14px;color:#CCCCCC;font-size:12px">Put your preheader text here</p></td>
            </tr>
            </table></td>
            </tr>
            </table><!--[if mso]></td><td style="width:20px"></td><td style="width:278px" valign="top"><![endif]-->
            <table class="es-right" cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
            <tr style="border-collapse:collapse">
            <td align="left" style="padding:0;Margin:0;width:278px">
            <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr style="border-collapse:collapse">
            <td align="right" class="es-infoblock es-m-txt-c" style="padding:0;Margin:0;line-height:14px;font-size:12px;color:#CCCCCC"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:14px;color:#CCCCCC;font-size:12px"><a href="https://viewstripo.email" class="view" target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#CCCCCC;font-size:12px;font-family:arial, 'helvetica neue', helvetica, sans-serif">View in browser</a></p></td>
            </tr>
            </table></td>
            </tr>
            </table><!--[if mso]></td></tr></table><![endif]--></td>
            </tr>
            </table></td>
            </tr>
            </table>
            <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
            <tr style="border-collapse:collapse"></tr>
            <tr style="border-collapse:collapse">
            <td align="center" style="padding:0;Margin:0">
            <table class="es-header-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#044767;width:600px" cellspacing="0" cellpadding="0" bgcolor="#044767" align="center">
            <tr style="border-collapse:collapse">
            <td align="left" bgcolor="#b6893e" style="padding:0;Margin:0;padding-top:20px;padding-left:35px;padding-right:35px;background-color:#b6893e">
            <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr style="border-collapse:collapse">
            <td align="center" valign="top" style="padding:0;Margin:0;width:530px">
            <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr style="border-collapse:collapse">
            <td align="left" style="padding:0;Margin:0"><a name="https://final-project-dun.vercel.app/" href="" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#FFFFFF;font-size:14px"></a><h1 style="Margin:0;line-height:43px;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;font-size:36px;font-style:normal;font-weight:bold;color:#ffffff;text-align:center">Logo Exmine</h1><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#FFFFFF;font-size:14px"><br></p></td>
            </tr>
            </table></td>
            </tr>
            </table></td>
            </tr>
            </table></td>
            </tr>
            </table>
            <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
            <tr style="border-collapse:collapse">
            <td align="center" style="padding:0;Margin:0">
            <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
            <tr style="border-collapse:collapse">
            <td align="left" style="padding:0;Margin:0;padding-left:35px;padding-right:35px;padding-top:40px">
            <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr style="border-collapse:collapse">
            <td valign="top" align="center" style="padding:0;Margin:0;width:530px">
            <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr style="border-collapse:collapse">
            <td align="center" style="Margin:0;padding-top:25px;padding-bottom:25px;padding-left:35px;padding-right:35px;font-size:0px"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo7kTWQR75jYTD-aPOqpRTKJECFhpLRJtcRQ&usqp=CAU" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="120"></td>
            </tr>
            <tr style="border-collapse:collapse">
            <td align="center" style="padding:0;Margin:0;padding-bottom:10px"><h2 style="Margin:0;line-height:34px;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;font-size:28px;font-style:normal;font-weight:bold;color:#333333">Hola ${findUser.firstName}, tu orden esta se esta procesando!</h2></td>
            </tr>
            <tr style="border-collapse:collapse">
            <td align="center" bgcolor="#dfdcd3" style="padding:0;Margin:0;padding-bottom:10px"><h2 style="Margin:0;line-height:20px;mso-line-height-rule:exactly;font-family:verdana, geneva, sans-serif;font-size:17px;font-style:normal;font-weight:bold;color:#dea03c;text-align:left"><br></h2><h2 style="Margin:0;line-height:20px;mso-line-height-rule:exactly;font-family:verdana, geneva, sans-serif;font-size:17px;font-style:normal;font-weight:bold;color:#000000;text-align:center">Recibirás un correo cuando tu orden ha sido despachada</h2></td>
            </tr>
            </table></td>
            </tr>
            </table></td>
            </tr>
            </table></td>
            </tr>
            </table>
            <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
            <tr style="border-collapse:collapse">
            <td align="center" style="padding:0;Margin:0">
            <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
            <tr style="border-collapse:collapse">
            <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:35px;padding-right:35px">
            <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr style="border-collapse:collapse">
            <td valign="top" align="center" style="padding:0;Margin:0;width:530px">
            <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr style="border-collapse:collapse">
            <td bgcolor="#eeeeee" align="left" style="Margin:0;padding-top:10px;padding-bottom:10px;padding-left:10px;padding-right:10px">
            <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:500px" class="cke_show_border" cellspacing="1" cellpadding="1" border="0" align="left" role="presentation">
            <tr style="border-collapse:collapse">
            <td width="80%" style="padding:0;Margin:0"><h4 style="Margin:0;line-height:120%;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif">Número de orden:&nbsp;</h4></td>
            <td width="20%" style="padding:0;Margin:0"><h4 style="Margin:0;line-height:120%;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif">${getOrder.id}</h4></td>
            </tr>
            </table></td>
            </tr>
            </table></td>
            </tr>
            </table></td>
            </tr>
            <tr style="border-collapse:collapse">
            <td align="left" style="padding:0;Margin:0;padding-left:35px;padding-right:35px">
            <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr style="border-collapse:collapse">
            <td valign="top" align="center" style="padding:0;Margin:0;width:530px">
            <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr style="border-collapse:collapse">
            <td align="left" style="Margin:0;padding-top:10px;padding-bottom:10px;padding-left:10px;padding-right:10px">
            <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:500px" class="cke_show_border" cellspacing="1" cellpadding="1" border="0" align="left" role="presentation">
            <tr style="border-collapse:collapse">
            <td style="padding:5px 10px 5px 0;Margin:0" width="80%" align="left"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#333333;font-size:16px"><strong>Articulos:</strong></p></td>
            <td style="padding:5px 0;Margin:0" width="20%" align="left"><strong>${getOrder.quantity}</strong></td>
            </tr>
            <tr style="border-collapse:collapse">
            <td style="padding:5px 10px 5px 0;Margin:0" width="80%" align="left"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#333333;font-size:16px">Envio</p></td>
            <td style="padding:5px 0;Margin:0" width="20%" align="left"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#333333;font-size:16px">$10.00</p></td>
            </tr>
            <tr style="border-collapse:collapse">
            <td style="padding:5px 10px 5px 0;Margin:0" width="80%" align="left"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#333333;font-size:16px"><br></p></td>
            <td style="padding:5px 0;Margin:0" width="20%" align="left"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#333333;font-size:16px"><br></p></td>
            </tr>
            </table></td>
            </tr>
            <tr style="border-collapse:collapse">
            <td align="left" style="Margin:0;padding-top:10px;padding-bottom:10px;padding-left:10px;padding-right:10px">
            
            
            ${outputHTML}
            
            
            </tr>
            </table></td>
            </tr>
            </table></td>
            </tr>
            <tr style="border-collapse:collapse">
            <td align="left" style="padding:0;Margin:0;padding-top:10px;padding-left:35px;padding-right:35px">
            <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr style="border-collapse:collapse">
            <td valign="top" align="center" style="padding:0;Margin:0;width:530px">
            <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;border-top:3px solid #eeeeee;border-bottom:3px solid #eeeeee" width="100%" cellspacing="0" cellpadding="0" role="presentation">
            <tr style="border-collapse:collapse">
            <td align="left" style="Margin:0;padding-left:10px;padding-right:10px;padding-top:15px;padding-bottom:15px">
            <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:500px" class="cke_show_border" cellspacing="1" cellpadding="1" border="0" align="left" role="presentation">
            <tr style="border-collapse:collapse">
            <td width="80%" style="padding:0;Margin:0"><h4 style="Margin:0;line-height:120%;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif">TOTAL</h4></td>
            <td width="20%" style="padding:0;Margin:0"><h4 style="Margin:0;line-height:120%;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif">${dollarUSLocale.format(getOrder.total)}</h4></td>
            </tr>
            </table></td>
            </tr>
            </table></td>
            </tr>
            </table></td>
            </tr>
            <tr style="border-collapse:collapse">
            <td align="left" style="Margin:0;padding-left:35px;padding-right:35px;padding-top:40px;padding-bottom:40px"><!--[if mso]><table style="width:530px" cellpadding="0" cellspacing="0"><tr><td style="width:255px" valign="top"><![endif]-->
            <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
            <tr style="border-collapse:collapse">
            <td class="es-m-p20b" align="left" style="padding:0;Margin:0;width:255px">
            <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr style="border-collapse:collapse">
            <td align="left" style="padding:0;Margin:0;padding-bottom:15px"><h4 style="Margin:0;line-height:120%;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif">Dirección de envio:</h4></td>
            </tr>
            <tr style="border-collapse:collapse">
            <td align="left" style="padding:0;Margin:0;padding-bottom:10px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#333333;font-size:16px">${getOrder.Address1}, ${getOrder.City}, ${getOrder.PostCode}, ${getOrder.Country}, ${getOrder.Mobile}</p></td>
            </tr>
            </table></td>
            </tr>
            </table><!--[if mso]></td><td style="width:20px"></td><td style="width:255px" valign="top"><![endif]-->
            <table class="es-right" cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
            <tr style="border-collapse:collapse">
            <td align="left" style="padding:0;Margin:0;width:255px">
            <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr style="border-collapse:collapse">
            <td align="left" style="padding:0;Margin:0;padding-bottom:15px"><h4 style="Margin:0;line-height:120%;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif">Fecha programada de entrega:</h4></td>
            </tr>
            <tr style="border-collapse:collapse">
            <td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#333333;font-size:16px">January 1st, 2016</p></td>
            </tr>
            </table></td>
            </tr>
            </table><!--[if mso]></td></tr></table><![endif]--></td>
            </tr>
            </table></td>
            </tr>
            </table>
            <table cellpadding="0" cellspacing="0" class="es-footer" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
            <tr style="border-collapse:collapse">
            <td align="center" style="padding:0;Margin:0">
            <table class="es-footer-body" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
            <tr style="border-collapse:collapse">
            <td align="left" bgcolor="#b6893e" style="padding:0;Margin:0;padding-top:35px;padding-left:35px;padding-right:35px;background-color:#b6893e">
            <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr style="border-collapse:collapse">
            <td valign="top" align="center" style="padding:0;Margin:0;width:530px">
            <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr style="border-collapse:collapse">
            <td align="center" style="padding:0;Margin:0;padding-bottom:35px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#333333;font-size:14px">Todos los derechos reservados</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#333333;font-size:14px">Copyright ©&nbsp;<a href="https://final-project-dun.vercel.app/about" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#333333;font-size:14px">EXMINE</a>&nbsp;2022.</p></td>
            </tr>
            </table></td>
            </tr>
            </table></td>
            </tr>
            </table></td>
            </tr>
            </table>
            <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
            <tr style="border-collapse:collapse">
            <td align="center" style="padding:0;Margin:0">
            <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" cellspacing="0" cellpadding="0" align="center">
            <tr style="border-collapse:collapse">
            <td align="left" style="Margin:0;padding-left:20px;padding-right:20px;padding-top:30px;padding-bottom:30px">
            <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr style="border-collapse:collapse">
            <td valign="top" align="center" style="padding:0;Margin:0;width:560px">
            <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr style="border-collapse:collapse">
            <td class="es-infoblock made_with" align="center" style="padding:0;Margin:0;line-height:120%;font-size:0;color:#CCCCCC"><a target="_blank" href="https://viewstripo.email/?utm_source=templates&utm_medium=email&utm_campaign=accessory&utm_content=trigger_newsletter3" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#CCCCCC;font-size:12px"><img src="https://vitddo.stripocdn.email/content/guids/CABINET_9df86e5b6c53dd0319931e2447ed854b/images/64951510234941531.png" alt width="125" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a></td>
            </tr>
            </table></td>
            </tr>
            </table></td>
            </tr>
            </table></td>
            </tr>
            </table></td>
            </tr>
            </table>
            </div>
            </body>
            </html>`
          });
  
          return res.send("Order status updated successfully!")

        } else if(state === "shipped") {

          await getOrder.update({
            state,
          })

          let info = await transporter.sendMail({
            from: '"Exmine Store" <exmine.store@hotmail.com>', // sender address
            to: [findUser.email], // list of receivers
            subject: "Envio de Pedido", // Subject line
            text: "", // plain text body
            html:  `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="width:100%;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
            <head>
            <link type="text/css" rel="stylesheet" id="dark-mode-custom-link">
            <link type="text/css" rel="stylesheet" id="dark-mode-general-link">
            <link type="text/css" rel="stylesheet" id="dark-mode-custom-link">
            <link type="text/css" rel="stylesheet" id="dark-mode-general-link">
            <link type="text/css" rel="stylesheet" id="dark-mode-custom-link">
            <link type="text/css" rel="stylesheet" id="dark-mode-general-link">
            <link type="text/css" rel="stylesheet" id="dark-mode-custom-link">
            <link type="text/css" rel="stylesheet" id="dark-mode-general-link">
            <meta charset="UTF-8">
            <meta content="width=device-width, initial-scale=1" name="viewport">
            <meta name="x-apple-disable-message-reformatting">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta content="telephone=no" name="format-detection">
            <title>Orden Envio</title><!--[if (mso 16)]>
            <style type="text/css">
            a {text-decoration: none;}
            </style>
            <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
            <xml>
            <o:OfficeDocumentSettings>
            <o:AllowPNG></o:AllowPNG>
            <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
            </xml>
            <![endif]--><!--[if !mso]><!-- -->
            <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700,700i" rel="stylesheet"><!--<![endif]-->
            <style type="text/css">
            #outlook a {
            padding:0;
            }
            .ExternalClass {
            width:100%;
            }
            .ExternalClass,
            .ExternalClass p,
            .ExternalClass span,
            .ExternalClass font,
            .ExternalClass td,
            .ExternalClass div {
            line-height:100%;
            }
            .es-button {
            mso-style-priority:100!important;
            text-decoration:none!important;
            }
            a[x-apple-data-detectors] {
            color:inherit!important;
            text-decoration:none!important;
            font-size:inherit!important;
            font-family:inherit!important;
            font-weight:inherit!important;
            line-height:inherit!important;
            }
            .es-desk-hidden {
            display:none;
            float:left;
            overflow:hidden;
            width:0;
            max-height:0;
            line-height:0;
            mso-hide:all;
            }
            [data-ogsb] .es-button {
            border-width:0!important;
            padding:15px 30px 15px 30px!important;
            }
            @media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120%!important } h1 { font-size:32px!important; text-align:center } h2 { font-size:26px!important; text-align:center } h3 { font-size:20px!important; text-align:center } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:32px!important } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px!important } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important } .es-menu td a { font-size:16px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:16px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:16px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:16px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:inline-block!important } a.es-button, button.es-button { font-size:16px!important; display:inline-block!important; border-width:15px 30px 15px 30px!important } .es-btn-fw { border-width:10px 0px!important; text-align:center!important } .es-adaptive table, .es-btn-fw, .es-btn-fw-brdr, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } }
            </style>
            </head>
            <body style="width:100%;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
            <div class="es-wrapper-color" style="background-color:#EEEEEE"><!--[if gte mso 9]>
            <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
            <v:fill type="tile" color="#eeeeee"></v:fill>
            </v:background>
            <![endif]-->
            <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top">
            <tr style="border-collapse:collapse">
            <td valign="top" style="padding:0;Margin:0">
            <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
            <tr style="border-collapse:collapse">
            <td align="center" style="padding:0;Margin:0">
            <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" cellspacing="0" cellpadding="0" align="center">
            <tr style="border-collapse:collapse">
            <td align="left" style="Margin:0;padding-left:10px;padding-right:10px;padding-top:15px;padding-bottom:15px"><!--[if mso]><table style="width:580px" cellpadding="0" cellspacing="0"><tr><td style="width:282px" valign="top"><![endif]-->
            <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
            <tr style="border-collapse:collapse">
            <td align="left" style="padding:0;Margin:0;width:282px">
            <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr style="border-collapse:collapse">
            <td class="es-infoblock es-m-txt-c" align="left" style="padding:0;Margin:0;line-height:14px;font-size:12px;color:#CCCCCC"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica\ neue', helvetica, sans-serif;line-height:14px;color:#CCCCCC;font-size:12px">Put your preheader text here</p></td>
            </tr>
            </table></td>
            </tr>
            </table><!--[if mso]></td><td style="width:20px"></td><td style="width:278px" valign="top"><![endif]-->
            <table class="es-right" cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
            <tr style="border-collapse:collapse">
            <td align="left" style="padding:0;Margin:0;width:278px">
            <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr style="border-collapse:collapse">
            <td align="right" class="es-infoblock es-m-txt-c" style="padding:0;Margin:0;line-height:14px;font-size:12px;color:#CCCCCC"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:14px;color:#CCCCCC;font-size:12px"><a href="https://viewstripo.email" class="view" target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#CCCCCC;font-size:12px;font-family:arial, 'helvetica neue', helvetica, sans-serif">View in browser</a></p></td>
            </tr>
            </table></td>
            </tr>
            </table><!--[if mso]></td></tr></table><![endif]--></td>
            </tr>
            </table></td>
            </tr>
            </table>
            <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
            <tr style="border-collapse:collapse"></tr>
            <tr style="border-collapse:collapse">
            <td align="center" style="padding:0;Margin:0">
            <table class="es-header-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#044767;width:600px" cellspacing="0" cellpadding="0" bgcolor="#044767" align="center">
            <tr style="border-collapse:collapse">
            <td align="left" bgcolor="#b6893e" style="padding:0;Margin:0;padding-top:20px;padding-left:35px;padding-right:35px;background-color:#b6893e">
            <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr style="border-collapse:collapse">
            <td align="center" valign="top" style="padding:0;Margin:0;width:530px">
            <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr style="border-collapse:collapse">
            <td align="left" style="padding:0;Margin:0"><a name="https://final-project-dun.vercel.app/" href="" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#FFFFFF;font-size:14px"></a><h1 style="Margin:0;line-height:43px;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;font-size:36px;font-style:normal;font-weight:bold;color:#ffffff;text-align:center">Logo Exmine</h1><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#FFFFFF;font-size:14px"><br></p></td>
            </tr>
            </table></td>
            </tr>
            </table></td>
            </tr>
            </table></td>
            </tr>
            </table>
            <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
            <tr style="border-collapse:collapse">
            <td align="center" style="padding:0;Margin:0">
            <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
            <tr style="border-collapse:collapse">
            <td align="left" style="padding:0;Margin:0;padding-left:35px;padding-right:35px;padding-top:40px">
            <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr style="border-collapse:collapse">
            <td valign="top" align="center" style="padding:0;Margin:0;width:530px">
            <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr style="border-collapse:collapse">
            <td align="center" style="Margin:0;padding-top:25px;padding-bottom:25px;padding-left:35px;padding-right:35px;font-size:0px"><img src="https://vitddo.stripocdn.email/content/guids/CABINET_d585429e5cd66ec7a20d47794d4e5c07/images/delivery.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="120"></td>
            </tr>
            <tr style="border-collapse:collapse">
            <td align="center" style="padding:0;Margin:0;padding-bottom:10px"><h2 style="Margin:0;line-height:34px;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;font-size:28px;font-style:normal;font-weight:bold;color:#333333">Hola ${findUser.firstName}, tu orden ha sido despachada!</h2></td>
            </tr>
            <tr style="border-collapse:collapse">
            <td align="center" bgcolor="#dfdcd3" style="padding:0;Margin:0;padding-bottom:10px"><h2 style="Margin:0;line-height:20px;mso-line-height-rule:exactly;font-family:verdana, geneva, sans-serif;font-size:17px;font-style:normal;font-weight:bold;color:#dea03c;text-align:left"><br></h2><h2 style="Margin:0;line-height:20px;mso-line-height-rule:exactly;font-family:verdana, geneva, sans-serif;font-size:17px;font-style:normal;font-weight:bold;color:#000000;text-align:center">Si necesitas cambiar la direción de envio, por favor responde a este mensaje o escribenos a: <u>exminer.hardware@gmail.com</u></h2></td>
            </tr>
            </table></td>
            </tr>
            </table></td>
            </tr>
            </table></td>
            </tr>
            </table>
            <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
            <tr style="border-collapse:collapse">
            <td align="center" style="padding:0;Margin:0">
            <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
            <tr style="border-collapse:collapse">
            <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:35px;padding-right:35px">
            <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr style="border-collapse:collapse">
            <td valign="top" align="center" style="padding:0;Margin:0;width:530px">
            <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr style="border-collapse:collapse">
            <td bgcolor="#eeeeee" align="left" style="Margin:0;padding-top:10px;padding-bottom:10px;padding-left:10px;padding-right:10px">
            <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:500px" class="cke_show_border" cellspacing="1" cellpadding="1" border="0" align="left" role="presentation">
            <tr style="border-collapse:collapse">
            <td width="80%" style="padding:0;Margin:0"><h4 style="Margin:0;line-height:120%;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif">Número de orden:&nbsp;</h4></td>
            <td width="20%" style="padding:0;Margin:0"><h4 style="Margin:0;line-height:120%;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif">${getOrder.id}</h4></td>
            </tr>
            </table></td>
            </tr>
            </table></td>
            </tr>
            </table></td>
            </tr>
            <tr style="border-collapse:collapse">
            <td align="left" style="padding:0;Margin:0;padding-left:35px;padding-right:35px">
            <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr style="border-collapse:collapse">
            <td valign="top" align="center" style="padding:0;Margin:0;width:530px">
            <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr style="border-collapse:collapse">
            <td align="left" style="Margin:0;padding-top:10px;padding-bottom:10px;padding-left:10px;padding-right:10px">
            <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:500px" class="cke_show_border" cellspacing="1" cellpadding="1" border="0" align="left" role="presentation">
            <tr style="border-collapse:collapse">
            <td style="padding:5px 10px 5px 0;Margin:0" width="80%" align="left"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#333333;font-size:16px"><strong>Articulos:</strong></p></td>
            <td style="padding:5px 0;Margin:0" width="20%" align="left"><strong>${getOrder.quantity}</strong></td>
            </tr>
            <tr style="border-collapse:collapse">
            <td style="padding:5px 10px 5px 0;Margin:0" width="80%" align="left"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#333333;font-size:16px">Envio</p></td>
            <td style="padding:5px 0;Margin:0" width="20%" align="left"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#333333;font-size:16px">$10.00</p></td>
            </tr>
            <tr style="border-collapse:collapse">
            <td style="padding:5px 10px 5px 0;Margin:0" width="80%" align="left"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#333333;font-size:16px"><br></p></td>
            <td style="padding:5px 0;Margin:0" width="20%" align="left"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#333333;font-size:16px"><br></p></td>
            </tr>
            </table></td>
            </tr>
            <tr style="border-collapse:collapse">
            <td align="left" style="Margin:0;padding-top:10px;padding-bottom:10px;padding-left:10px;padding-right:10px">
            
            
            ${outputHTML}
            
            
            </tr>
            </table></td>
            </tr>
            </table></td>
            </tr>
            <tr style="border-collapse:collapse">
            <td align="left" style="padding:0;Margin:0;padding-top:10px;padding-left:35px;padding-right:35px">
            <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr style="border-collapse:collapse">
            <td valign="top" align="center" style="padding:0;Margin:0;width:530px">
            <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;border-top:3px solid #eeeeee;border-bottom:3px solid #eeeeee" width="100%" cellspacing="0" cellpadding="0" role="presentation">
            <tr style="border-collapse:collapse">
            <td align="left" style="Margin:0;padding-left:10px;padding-right:10px;padding-top:15px;padding-bottom:15px">
            <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:500px" class="cke_show_border" cellspacing="1" cellpadding="1" border="0" align="left" role="presentation">
            <tr style="border-collapse:collapse">
            <td width="80%" style="padding:0;Margin:0"><h4 style="Margin:0;line-height:120%;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif">TOTAL</h4></td>
            <td width="20%" style="padding:0;Margin:0"><h4 style="Margin:0;line-height:120%;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif">${dollarUSLocale.format(getOrder.total)}</h4></td>
            </tr>
            </table></td>
            </tr>
            </table></td>
            </tr>
            </table></td>
            </tr>
            <tr style="border-collapse:collapse">
            <td align="left" style="Margin:0;padding-left:35px;padding-right:35px;padding-top:40px;padding-bottom:40px"><!--[if mso]><table style="width:530px" cellpadding="0" cellspacing="0"><tr><td style="width:255px" valign="top"><![endif]-->
            <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
            <tr style="border-collapse:collapse">
            <td class="es-m-p20b" align="left" style="padding:0;Margin:0;width:255px">
            <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr style="border-collapse:collapse">
            <td align="left" style="padding:0;Margin:0;padding-bottom:15px"><h4 style="Margin:0;line-height:120%;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif">Dirección de envio:</h4></td>
            </tr>
            <tr style="border-collapse:collapse">
            <td align="left" style="padding:0;Margin:0;padding-bottom:10px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#333333;font-size:16px">${getOrder.Address1}, ${getOrder.City}, ${getOrder.PostCode}, ${getOrder.Country}, ${getOrder.Mobile}</p></td>
            </tr>
            </table></td>
            </tr>
            </table><!--[if mso]></td><td style="width:20px"></td><td style="width:255px" valign="top"><![endif]-->
            <table class="es-right" cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
            <tr style="border-collapse:collapse">
            <td align="left" style="padding:0;Margin:0;width:255px">
            <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr style="border-collapse:collapse">
            <td align="left" style="padding:0;Margin:0;padding-bottom:15px"><h4 style="Margin:0;line-height:120%;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif">Fecha programada de entrega:</h4></td>
            </tr>
            <tr style="border-collapse:collapse">
            <td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#333333;font-size:16px">January 1st, 2016</p></td>
            </tr>
            </table></td>
            </tr>
            </table><!--[if mso]></td></tr></table><![endif]--></td>
            </tr>
            </table></td>
            </tr>
            </table>
            <table cellpadding="0" cellspacing="0" class="es-footer" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
            <tr style="border-collapse:collapse">
            <td align="center" style="padding:0;Margin:0">
            <table class="es-footer-body" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
            <tr style="border-collapse:collapse">
            <td align="left" bgcolor="#b6893e" style="padding:0;Margin:0;padding-top:35px;padding-left:35px;padding-right:35px;background-color:#b6893e">
            <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr style="border-collapse:collapse">
            <td valign="top" align="center" style="padding:0;Margin:0;width:530px">
            <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr style="border-collapse:collapse">
            <td align="center" style="padding:0;Margin:0;padding-bottom:35px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#333333;font-size:14px">Todos los derechos reservados</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#333333;font-size:14px">Copyright ©&nbsp;<a href="https://final-project-dun.vercel.app/about" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#333333;font-size:14px">EXMINE</a>&nbsp;2022.</p></td>
            </tr>
            </table></td>
            </tr>
            </table></td>
            </tr>
            </table></td>
            </tr>
            </table>
            <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
            <tr style="border-collapse:collapse">
            <td align="center" style="padding:0;Margin:0">
            <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" cellspacing="0" cellpadding="0" align="center">
            <tr style="border-collapse:collapse">
            <td align="left" style="Margin:0;padding-left:20px;padding-right:20px;padding-top:30px;padding-bottom:30px">
            <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr style="border-collapse:collapse">
            <td valign="top" align="center" style="padding:0;Margin:0;width:560px">
            <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr style="border-collapse:collapse">
            <td class="es-infoblock made_with" align="center" style="padding:0;Margin:0;line-height:120%;font-size:0;color:#CCCCCC"><a target="_blank" href="https://viewstripo.email/?utm_source=templates&utm_medium=email&utm_campaign=accessory&utm_content=trigger_newsletter3" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#CCCCCC;font-size:12px"><img src="https://vitddo.stripocdn.email/content/guids/CABINET_9df86e5b6c53dd0319931e2447ed854b/images/64951510234941531.png" alt width="125" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a></td>
            </tr>
            </table></td>
            </tr>
            </table></td>
            </tr>
            </table></td>
            </tr>
            </table></td>
            </tr>
            </table>
            </div>
            </body>
            </html>`
          });

        } else if(state === "completed"){

          let info = await transporter.sendMail({
            from: '"Exmine Store" <exmine.store@hotmail.com>', // sender address
            to: [findUser.email], // list of receivers
            subject: "Entrega de Pedido", // Subject line
            text: "", // plain text body
            html:  `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="width:100%;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
            <head>
            <link type="text/css" rel="stylesheet" id="dark-mode-custom-link">
            <link type="text/css" rel="stylesheet" id="dark-mode-general-link">
            <link type="text/css" rel="stylesheet" id="dark-mode-custom-link">
            <link type="text/css" rel="stylesheet" id="dark-mode-general-link">
            <link type="text/css" rel="stylesheet" id="dark-mode-custom-link">
            <link type="text/css" rel="stylesheet" id="dark-mode-general-link">
            <link type="text/css" rel="stylesheet" id="dark-mode-custom-link">
            <link type="text/css" rel="stylesheet" id="dark-mode-general-link">
            <link type="text/css" rel="stylesheet" id="dark-mode-custom-link">
            <link type="text/css" rel="stylesheet" id="dark-mode-general-link">
            <meta charset="UTF-8">
            <meta content="width=device-width, initial-scale=1" name="viewport">
            <meta name="x-apple-disable-message-reformatting">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta content="telephone=no" name="format-detection">
            <title>Orden Completa</title><!--[if (mso 16)]>
            <style type="text/css">
            a {text-decoration: none;}
            </style>
            <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
            <xml>
            <o:OfficeDocumentSettings>
            <o:AllowPNG></o:AllowPNG>
            <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
            </xml>
            <![endif]--><!--[if !mso]><!-- -->
            <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700,700i" rel="stylesheet"><!--<![endif]-->
            <style type="text/css">
            #outlook a {
            padding:0;
            }
            .ExternalClass {
            width:100%;
            }
            .ExternalClass,
            .ExternalClass p,
            .ExternalClass span,
            .ExternalClass font,
            .ExternalClass td,
            .ExternalClass div {
            line-height:100%;
            }
            .es-button {
            mso-style-priority:100!important;
            text-decoration:none!important;
            }
            a[x-apple-data-detectors] {
            color:inherit!important;
            text-decoration:none!important;
            font-size:inherit!important;
            font-family:inherit!important;
            font-weight:inherit!important;
            line-height:inherit!important;
            }
            .es-desk-hidden {
            display:none;
            float:left;
            overflow:hidden;
            width:0;
            max-height:0;
            line-height:0;
            mso-hide:all;
            }
            [data-ogsb] .es-button {
            border-width:0!important;
            padding:15px 30px 15px 30px!important;
            }
            @media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120%!important } h1 { font-size:32px!important; text-align:center } h2 { font-size:26px!important; text-align:center } h3 { font-size:20px!important; text-align:center } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:32px!important } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px!important } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important } .es-menu td a { font-size:16px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:16px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:16px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:16px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:inline-block!important } a.es-button, button.es-button { font-size:16px!important; display:inline-block!important; border-width:15px 30px 15px 30px!important } .es-btn-fw { border-width:10px 0px!important; text-align:center!important } .es-adaptive table, .es-btn-fw, .es-btn-fw-brdr, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } }
            </style>
            </head>
            <body style="width:100%;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
            <div class="es-wrapper-color" style="background-color:#EEEEEE"><!--[if gte mso 9]>
            <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
            <v:fill type="tile" color="#eeeeee"></v:fill>
            </v:background>
            <![endif]-->
            <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top">
            <tr style="border-collapse:collapse">
            <td valign="top" style="padding:0;Margin:0">
            <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
            <tr style="border-collapse:collapse">
            <td align="center" style="padding:0;Margin:0">
            <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" cellspacing="0" cellpadding="0" align="center">
            <tr style="border-collapse:collapse">
            <td align="left" style="Margin:0;padding-left:10px;padding-right:10px;padding-top:15px;padding-bottom:15px"><!--[if mso]><table style="width:580px" cellpadding="0" cellspacing="0"><tr><td style="width:282px" valign="top"><![endif]-->
            <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
            <tr style="border-collapse:collapse">
            <td align="left" style="padding:0;Margin:0;width:282px">
            <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr style="border-collapse:collapse">
            <td class="es-infoblock es-m-txt-c" align="left" style="padding:0;Margin:0;line-height:14px;font-size:12px;color:#CCCCCC"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica\ neue', helvetica, sans-serif;line-height:14px;color:#CCCCCC;font-size:12px">Put your preheader text here</p></td>
            </tr>
            </table></td>
            </tr>
            </table><!--[if mso]></td><td style="width:20px"></td><td style="width:278px" valign="top"><![endif]-->
            <table class="es-right" cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
            <tr style="border-collapse:collapse">
            <td align="left" style="padding:0;Margin:0;width:278px">
            <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr style="border-collapse:collapse">
            <td align="right" class="es-infoblock es-m-txt-c" style="padding:0;Margin:0;line-height:14px;font-size:12px;color:#CCCCCC"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:14px;color:#CCCCCC;font-size:12px"><a href="https://viewstripo.email" class="view" target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#CCCCCC;font-size:12px;font-family:arial, 'helvetica neue', helvetica, sans-serif">View in browser</a></p></td>
            </tr>
            </table></td>
            </tr>
            </table><!--[if mso]></td></tr></table><![endif]--></td>
            </tr>
            </table></td>
            </tr>
            </table>
            <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
            <tr style="border-collapse:collapse"></tr>
            <tr style="border-collapse:collapse">
            <td align="center" style="padding:0;Margin:0">
            <table class="es-header-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#044767;width:600px" cellspacing="0" cellpadding="0" bgcolor="#044767" align="center">
            <tr style="border-collapse:collapse">
            <td align="left" bgcolor="#b6893e" style="padding:0;Margin:0;padding-top:20px;padding-left:35px;padding-right:35px;background-color:#b6893e">
            <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr style="border-collapse:collapse">
            <td align="center" valign="top" style="padding:0;Margin:0;width:530px">
            <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr style="border-collapse:collapse">
            <td align="left" style="padding:0;Margin:0"><a name="https://final-project-dun.vercel.app/" href="" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#FFFFFF;font-size:14px"></a><h1 style="Margin:0;line-height:43px;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;font-size:36px;font-style:normal;font-weight:bold;color:#ffffff;text-align:center">Logo Exmine</h1><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#FFFFFF;font-size:14px"><br></p></td>
            </tr>
            </table></td>
            </tr>
            </table></td>
            </tr>
            </table></td>
            </tr>
            </table>
            <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
            <tr style="border-collapse:collapse">
            <td align="center" style="padding:0;Margin:0">
            <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
            <tr style="border-collapse:collapse">
            <td align="left" style="padding:0;Margin:0;padding-left:35px;padding-right:35px;padding-top:40px">
            <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr style="border-collapse:collapse">
            <td valign="top" align="center" style="padding:0;Margin:0;width:530px">
            <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr style="border-collapse:collapse">
            <td align="center" style="Margin:0;padding-top:25px;padding-bottom:25px;padding-left:35px;padding-right:35px;font-size:0px"><img src="https://icons-for-free.com/download-icon-shipped-131964753257167520_512.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="120"></td>
            </tr>
            <tr style="border-collapse:collapse">
            <td align="center" style="padding:0;Margin:0;padding-bottom:10px"><h2 style="Margin:0;line-height:34px;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;font-size:28px;font-style:normal;font-weight:bold;color:#333333">Hola ${findUser.firstName}, tu paquete ya se entregó!</h2><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#333333;font-size:16px"><br></p></td>
            </tr>
            <tr style="border-collapse:collapse">
            <td align="center" bgcolor="#dfdcd3" style="padding:0;Margin:0;padding-bottom:10px"><h2 style="Margin:0;line-height:20px;mso-line-height-rule:exactly;font-family:verdana, geneva, sans-serif;font-size:17px;font-style:normal;font-weight:bold;color:#dea03c;text-align:left"><br></h2><h2 style="Margin:0;line-height:20px;mso-line-height-rule:exactly;font-family:verdana, geneva, sans-serif;font-size:17px;font-style:normal;font-weight:bold;color:#000000;text-align:center">Si deseas devolver tu producto ponte en contacto con nosotros: <u>exmine.hardware@gmail.com</u><br></h2></td>
            </tr>
            </table></td>
            </tr>
            </table></td>
            </tr>
            </table></td>
            </tr>
            </table>
            <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
            <tr style="border-collapse:collapse">
            <td align="center" style="padding:0;Margin:0">
            <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
            <tr style="border-collapse:collapse">
            <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:35px;padding-right:35px">
            <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr style="border-collapse:collapse">
            <td valign="top" align="center" style="padding:0;Margin:0;width:530px">
            <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr style="border-collapse:collapse">
            <td bgcolor="#eeeeee" align="left" style="Margin:0;padding-top:10px;padding-bottom:10px;padding-left:10px;padding-right:10px">
            <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:500px" class="cke_show_border" cellspacing="1" cellpadding="1" border="0" align="left" role="presentation">
            <tr style="border-collapse:collapse">
            <td width="80%" style="padding:0;Margin:0"><h4 style="Margin:0;line-height:120%;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif">Número de orden:&nbsp;</h4></td>
            <td width="20%" style="padding:0;Margin:0"><h4 style="Margin:0;line-height:120%;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif">${getOrder.id}</h4></td>
            </tr>
            </table></td>
            </tr>
            </table></td>
            </tr>
            </table></td>
            </tr>
            <tr style="border-collapse:collapse">
            <td align="left" style="padding:0;Margin:0;padding-top:10px;padding-left:35px;padding-right:35px">
            <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr style="border-collapse:collapse">
            <td valign="top" align="center" style="padding:0;Margin:0;width:530px">
            <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;border-top:3px solid #eeeeee;border-bottom:3px solid #eeeeee" width="100%" cellspacing="0" cellpadding="0" role="presentation">
            <tr style="border-collapse:collapse">
            <td align="left" style="Margin:0;padding-left:10px;padding-right:10px;padding-top:15px;padding-bottom:15px">
            <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:500px" class="cke_show_border" cellspacing="1" cellpadding="1" border="0" align="left" role="presentation">
            <tr style="border-collapse:collapse">
            <td width="80%" style="padding:0;Margin:0"><h4 style="Margin:0;line-height:120%;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif">TOTAL</h4></td>
            <td width="20%" style="padding:0;Margin:0"><h4 style="Margin:0;line-height:120%;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif">${dollarUSLocale.format(getOrder.total)}</h4></td>
            </tr>
            </table></td>
            </tr>
            </table></td>
            </tr>
            </table></td>
            </tr>
            <tr style="border-collapse:collapse">
            <td align="left" style="Margin:0;padding-left:35px;padding-right:35px;padding-top:40px;padding-bottom:40px"><!--[if mso]><table style="width:530px" cellpadding="0" cellspacing="0"><tr><td style="width:255px" valign="top"><![endif]-->
            <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
            <tr style="border-collapse:collapse">
            <td class="es-m-p20b" align="left" style="padding:0;Margin:0;width:255px">
            <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr style="border-collapse:collapse">
            <td align="left" style="padding:0;Margin:0;padding-bottom:15px"><h4 style="Margin:0;line-height:120%;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif">Dirección de envio:</h4></td>
            </tr>
            <tr style="border-collapse:collapse">
            <td align="left" style="padding:0;Margin:0;padding-bottom:10px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#333333;font-size:16px">${getOrder.Address1}, ${getOrder.City}, ${getOrder.PostCode}, ${getOrder.Country}, ${getOrder.Mobile}</p></td>
            </tr>
            </table></td>
            </tr>
            </table><!--[if mso]></td><td style="width:20px"></td><td style="width:255px" valign="top"><![endif]-->
            <table class="es-right" cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
            <tr style="border-collapse:collapse">
            <td align="left" style="padding:0;Margin:0;width:255px">
            <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr style="border-collapse:collapse">
            <td align="left" style="padding:0;Margin:0;padding-bottom:15px"><h4 style="Margin:0;line-height:120%;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif">Fecha de entrega:</h4></td>
            </tr>
            <tr style="border-collapse:collapse">
            <td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#333333;font-size:16px">January 1st, 2016</p></td>
            </tr>
            </table></td>
            </tr>
            </table><!--[if mso]></td></tr></table><![endif]--></td>
            </tr>
            </table></td>
            </tr>
            </table>
            <table cellpadding="0" cellspacing="0" class="es-footer" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
            <tr style="border-collapse:collapse">
            <td align="center" style="padding:0;Margin:0">
            <table class="es-footer-body" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
            <tr style="border-collapse:collapse">
            <td align="left" bgcolor="#b6893e" style="padding:0;Margin:0;padding-top:35px;padding-left:35px;padding-right:35px;background-color:#b6893e">
            <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr style="border-collapse:collapse">
            <td valign="top" align="center" style="padding:0;Margin:0;width:530px">
            <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr style="border-collapse:collapse">
            <td align="center" style="padding:0;Margin:0;padding-bottom:35px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#333333;font-size:14px">Todos los derechos reservados</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#333333;font-size:14px">Copyright ©&nbsp;<a href="https://final-project-dun.vercel.app/about" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#333333;font-size:14px">EXMINE</a>&nbsp;2022.</p></td>
            </tr>
            </table></td>
            </tr>
            </table></td>
            </tr>
            </table></td>
            </tr>
            </table>
            <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
            <tr style="border-collapse:collapse">
            <td align="center" style="padding:0;Margin:0">
            <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" cellspacing="0" cellpadding="0" align="center">
            <tr style="border-collapse:collapse">
            <td align="left" style="Margin:0;padding-left:20px;padding-right:20px;padding-top:30px;padding-bottom:30px">
            <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr style="border-collapse:collapse">
            <td valign="top" align="center" style="padding:0;Margin:0;width:560px">
            <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr style="border-collapse:collapse">
            <td class="es-infoblock made_with" align="center" style="padding:0;Margin:0;line-height:120%;font-size:0;color:#CCCCCC"><a target="_blank" href="https://viewstripo.email/?utm_source=templates&utm_medium=email&utm_campaign=accessory&utm_content=trigger_newsletter3" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#CCCCCC;font-size:12px"><img src="https://vitddo.stripocdn.email/content/guids/CABINET_9df86e5b6c53dd0319931e2447ed854b/images/64951510234941531.png" alt width="125" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a></td>
            </tr>
            </table></td>
            </tr>
            </table></td>
            </tr>
            </table></td>
            </tr>
            </table></td>
            </tr>
            </table>
            </div>
            </body>
            </html>`
          });

        } else if(state === "cancelled"){

          let info = await transporter.sendMail({
            from: '"Exmine Store" <exmine.store@hotmail.com>', // sender address
            to: [findUser.email], // list of receivers
            subject: "Cancelación de Pedido", // Subject line
            text: "", // plain text body
            html:  `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="width:100%;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
            <head>
            <link type="text/css" rel="stylesheet" id="dark-mode-custom-link">
            <link type="text/css" rel="stylesheet" id="dark-mode-general-link">
            <link type="text/css" rel="stylesheet" id="dark-mode-custom-link">
            <link type="text/css" rel="stylesheet" id="dark-mode-general-link">
            <link type="text/css" rel="stylesheet" id="dark-mode-custom-link">
            <link type="text/css" rel="stylesheet" id="dark-mode-general-link">
            <link type="text/css" rel="stylesheet" id="dark-mode-custom-link">
            <link type="text/css" rel="stylesheet" id="dark-mode-general-link">
            <link type="text/css" rel="stylesheet" id="dark-mode-custom-link">
            <link type="text/css" rel="stylesheet" id="dark-mode-general-link">
            <meta charset="UTF-8">
            <meta content="width=device-width, initial-scale=1" name="viewport">
            <meta name="x-apple-disable-message-reformatting">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta content="telephone=no" name="format-detection">
            <title>Orden Completa</title><!--[if (mso 16)]>
            <style type="text/css">
            a {text-decoration: none;}
            </style>
            <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
            <xml>
            <o:OfficeDocumentSettings>
            <o:AllowPNG></o:AllowPNG>
            <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
            </xml>
            <![endif]--><!--[if !mso]><!-- -->
            <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700,700i" rel="stylesheet"><!--<![endif]-->
            <style type="text/css">
            #outlook a {
            padding:0;
            }
            .ExternalClass {
            width:100%;
            }
            .ExternalClass,
            .ExternalClass p,
            .ExternalClass span,
            .ExternalClass font,
            .ExternalClass td,
            .ExternalClass div {
            line-height:100%;
            }
            .es-button {
            mso-style-priority:100!important;
            text-decoration:none!important;
            }
            a[x-apple-data-detectors] {
            color:inherit!important;
            text-decoration:none!important;
            font-size:inherit!important;
            font-family:inherit!important;
            font-weight:inherit!important;
            line-height:inherit!important;
            }
            .es-desk-hidden {
            display:none;
            float:left;
            overflow:hidden;
            width:0;
            max-height:0;
            line-height:0;
            mso-hide:all;
            }
            [data-ogsb] .es-button {
            border-width:0!important;
            padding:15px 30px 15px 30px!important;
            }
            @media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120%!important } h1 { font-size:32px!important; text-align:center } h2 { font-size:26px!important; text-align:center } h3 { font-size:20px!important; text-align:center } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:32px!important } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px!important } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important } .es-menu td a { font-size:16px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:16px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:16px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:16px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:inline-block!important } a.es-button, button.es-button { font-size:16px!important; display:inline-block!important; border-width:15px 30px 15px 30px!important } .es-btn-fw { border-width:10px 0px!important; text-align:center!important } .es-adaptive table, .es-btn-fw, .es-btn-fw-brdr, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } }
            </style>
            </head>
            <body style="width:100%;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
            <div class="es-wrapper-color" style="background-color:#EEEEEE"><!--[if gte mso 9]>
            <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
            <v:fill type="tile" color="#eeeeee"></v:fill>
            </v:background>
            <![endif]-->
            <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top">
            <tr style="border-collapse:collapse">
            <td valign="top" style="padding:0;Margin:0">
            <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
            <tr style="border-collapse:collapse">
            <td align="center" style="padding:0;Margin:0">
            <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" cellspacing="0" cellpadding="0" align="center">
            <tr style="border-collapse:collapse">
            <td align="left" style="Margin:0;padding-left:10px;padding-right:10px;padding-top:15px;padding-bottom:15px"><!--[if mso]><table style="width:580px" cellpadding="0" cellspacing="0"><tr><td style="width:282px" valign="top"><![endif]-->
            <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
            <tr style="border-collapse:collapse">
            <td align="left" style="padding:0;Margin:0;width:282px">
            <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr style="border-collapse:collapse">
            <td class="es-infoblock es-m-txt-c" align="left" style="padding:0;Margin:0;line-height:14px;font-size:12px;color:#CCCCCC"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica\ neue', helvetica, sans-serif;line-height:14px;color:#CCCCCC;font-size:12px">Put your preheader text here</p></td>
            </tr>
            </table></td>
            </tr>
            </table><!--[if mso]></td><td style="width:20px"></td><td style="width:278px" valign="top"><![endif]-->
            <table class="es-right" cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
            <tr style="border-collapse:collapse">
            <td align="left" style="padding:0;Margin:0;width:278px">
            <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr style="border-collapse:collapse">
            <td align="right" class="es-infoblock es-m-txt-c" style="padding:0;Margin:0;line-height:14px;font-size:12px;color:#CCCCCC"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:14px;color:#CCCCCC;font-size:12px"><a href="https://viewstripo.email" class="view" target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#CCCCCC;font-size:12px;font-family:arial, 'helvetica neue', helvetica, sans-serif">View in browser</a></p></td>
            </tr>
            </table></td>
            </tr>
            </table><!--[if mso]></td></tr></table><![endif]--></td>
            </tr>
            </table></td>
            </tr>
            </table>
            <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
            <tr style="border-collapse:collapse"></tr>
            <tr style="border-collapse:collapse">
            <td align="center" style="padding:0;Margin:0">
            <table class="es-header-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#044767;width:600px" cellspacing="0" cellpadding="0" bgcolor="#044767" align="center">
            <tr style="border-collapse:collapse">
            <td align="left" bgcolor="#b6893e" style="padding:0;Margin:0;padding-top:20px;padding-left:35px;padding-right:35px;background-color:#b6893e">
            <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr style="border-collapse:collapse">
            <td align="center" valign="top" style="padding:0;Margin:0;width:530px">
            <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr style="border-collapse:collapse">
            <td align="left" style="padding:0;Margin:0"><a name="https://final-project-dun.vercel.app/" href="" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#FFFFFF;font-size:14px"></a><h1 style="Margin:0;line-height:43px;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;font-size:36px;font-style:normal;font-weight:bold;color:#ffffff;text-align:center">Logo Exmine</h1><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#FFFFFF;font-size:14px"><br></p></td>
            </tr>
            </table></td>
            </tr>
            </table></td>
            </tr>
            </table></td>
            </tr>
            </table>
            <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
            <tr style="border-collapse:collapse">
            <td align="center" style="padding:0;Margin:0">
            <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
            <tr style="border-collapse:collapse">
            <td align="left" style="padding:0;Margin:0;padding-left:35px;padding-right:35px;padding-top:40px">
            <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr style="border-collapse:collapse">
            <td valign="top" align="center" style="padding:0;Margin:0;width:530px">
            <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr style="border-collapse:collapse">
            <td align="center" style="Margin:0;padding-top:25px;padding-bottom:25px;padding-left:35px;padding-right:35px;font-size:0px"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh2y1Ap-BZ505Te8R2nFPJ9v_ZSNAWiU--Tg&usqp=CAU" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="120"></td>
            </tr>
            <tr style="border-collapse:collapse">
            <td align="center" style="padding:0;Margin:0;padding-bottom:10px"><h2 style="Margin:0;line-height:34px;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;font-size:28px;font-style:normal;font-weight:bold;color:#333333">Hola ${findUser.firstName}, tu orden ha sido cancelada</h2><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#333333;font-size:16px"><br></p></td>
            </tr>
            <tr style="border-collapse:collapse">
            <td align="center" bgcolor="#dfdcd3" style="padding:0;Margin:0;padding-bottom:10px"><h2 style="Margin:0;line-height:20px;mso-line-height-rule:exactly;font-family:verdana, geneva, sans-serif;font-size:17px;font-style:normal;font-weight:bold;color:#dea03c;text-align:left"><br></h2><h2 style="Margin:0;line-height:20px;mso-line-height-rule:exactly;font-family:verdana, geneva, sans-serif;font-size:17px;font-style:normal;font-weight:bold;color:#000000;text-align:center">Hemos cancelado tu pedido por el siguente motivo: <br></h2></td>
            </tr>
            </table></td>
            </tr>
            </table></td>
            </tr>
            </table></td>
            </tr>
            </table>
            <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
            <tr style="border-collapse:collapse">
            <td align="center" style="padding:0;Margin:0">
            <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
            <tr style="border-collapse:collapse">
            <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:35px;padding-right:35px">
            <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr style="border-collapse:collapse">
            <td valign="top" align="center" style="padding:0;Margin:0;width:530px">
            <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr style="border-collapse:collapse">
            <td bgcolor="#eeeeee" align="left" style="Margin:0;padding-top:10px;padding-bottom:10px;padding-left:10px;padding-right:10px">
            <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:500px" class="cke_show_border" cellspacing="1" cellpadding="1" border="0" align="left" role="presentation">
            <tr style="border-collapse:collapse">
            <td width="80%" style="padding:0;Margin:0"><h4 style="Margin:0;line-height:120%;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif">Número de orden:&nbsp;</h4></td>
            <td width="20%" style="padding:0;Margin:0"><h4 style="Margin:0;line-height:120%;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif">${getOrder.id}</h4></td>
            </tr>
            </table></td>
            </tr>
            </table></td>
            </tr>
            </table></td>
            </tr>
            <tr style="border-collapse:collapse">
            <td align="left" style="padding:0;Margin:0;padding-top:10px;padding-left:35px;padding-right:35px">
            <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr style="border-collapse:collapse">
            <td valign="top" align="center" style="padding:0;Margin:0;width:530px">
            <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;border-top:3px solid #eeeeee;border-bottom:3px solid #eeeeee" width="100%" cellspacing="0" cellpadding="0" role="presentation">
            <tr style="border-collapse:collapse">
            <td align="left" style="Margin:0;padding-left:10px;padding-right:10px;padding-top:15px;padding-bottom:15px">
            <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:500px" class="cke_show_border" cellspacing="1" cellpadding="1" border="0" align="left" role="presentation">
            <tr style="border-collapse:collapse">
            <td width="80%" style="padding:0;Margin:0"><h4 style="Margin:0;line-height:120%;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif">TOTAL</h4></td>
            <td width="20%" style="padding:0;Margin:0"><h4 style="Margin:0;line-height:120%;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif">${dollarUSLocale.format(getOrder.total)}</h4></td>
            </tr>
            </table></td>
            </tr>
            </table></td>
            </tr>
            </table></td>
            </tr>
            <tr style="border-collapse:collapse">
            <td align="left" style="Margin:0;padding-left:35px;padding-right:35px;padding-top:40px;padding-bottom:40px"><!--[if mso]><table style="width:530px" cellpadding="0" cellspacing="0"><tr><td style="width:255px" valign="top"><![endif]-->
            <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
            <tr style="border-collapse:collapse">
            <td class="es-m-p20b" align="left" style="padding:0;Margin:0;width:255px">
            <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr style="border-collapse:collapse">
            <td align="left" style="padding:0;Margin:0;padding-bottom:15px"><h4 style="Margin:0;line-height:120%;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif">Dirección de envio:</h4></td>
            </tr>
            <tr style="border-collapse:collapse">
            <td align="left" style="padding:0;Margin:0;padding-bottom:10px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#333333;font-size:16px">${getOrder.Address1}, ${getOrder.City}, ${getOrder.PostCode}, ${getOrder.Country}, ${getOrder.Mobile}</p></td>
            </tr>
            </table></td>
            </tr>
            </table><!--[if mso]></td><td style="width:20px"></td><td style="width:255px" valign="top"><![endif]-->
            <table class="es-right" cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
            <tr style="border-collapse:collapse">
            <td align="left" style="padding:0;Margin:0;width:255px">
            <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr style="border-collapse:collapse">
            <td align="left" style="padding:0;Margin:0;padding-bottom:15px"><h4 style="Margin:0;line-height:120%;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif">Fecha de entrega:</h4></td>
            </tr>
            <tr style="border-collapse:collapse">
            <td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#333333;font-size:16px">Cancelada</p></td>
            </tr>
            </table></td>
            </tr>
            </table><!--[if mso]></td></tr></table><![endif]--></td>
            </tr>
            </table></td>
            </tr>
            </table>
            <table cellpadding="0" cellspacing="0" class="es-footer" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
            <tr style="border-collapse:collapse">
            <td align="center" style="padding:0;Margin:0">
            <table class="es-footer-body" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
            <tr style="border-collapse:collapse">
            <td align="left" bgcolor="#b6893e" style="padding:0;Margin:0;padding-top:35px;padding-left:35px;padding-right:35px;background-color:#b6893e">
            <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr style="border-collapse:collapse">
            <td valign="top" align="center" style="padding:0;Margin:0;width:530px">
            <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr style="border-collapse:collapse">
            <td align="center" style="padding:0;Margin:0;padding-bottom:35px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#333333;font-size:14px">Todos los derechos reservados</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#333333;font-size:14px">Copyright ©&nbsp;<a href="https://final-project-dun.vercel.app/about" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#333333;font-size:14px">EXMINE</a>&nbsp;2022.</p></td>
            </tr>
            </table></td>
            </tr>
            </table></td>
            </tr>
            </table></td>
            </tr>
            </table>
            <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
            <tr style="border-collapse:collapse">
            <td align="center" style="padding:0;Margin:0">
            <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" cellspacing="0" cellpadding="0" align="center">
            <tr style="border-collapse:collapse">
            <td align="left" style="Margin:0;padding-left:20px;padding-right:20px;padding-top:30px;padding-bottom:30px">
            <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr style="border-collapse:collapse">
            <td valign="top" align="center" style="padding:0;Margin:0;width:560px">
            <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr style="border-collapse:collapse">
            <td class="es-infoblock made_with" align="center" style="padding:0;Margin:0;line-height:120%;font-size:0;color:#CCCCCC"><a target="_blank" href="https://viewstripo.email/?utm_source=templates&utm_medium=email&utm_campaign=accessory&utm_content=trigger_newsletter3" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#CCCCCC;font-size:12px"><img src="https://vitddo.stripocdn.email/content/guids/CABINET_9df86e5b6c53dd0319931e2447ed854b/images/64951510234941531.png" alt width="125" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a></td>
            </tr>
            </table></td>
            </tr>
            </table></td>
            </tr>
            </table></td>
            </tr>
            </table></td>
            </tr>
            </table>
            </div>
            </body>
            </html>`
          });

        } else {
          return res.send("Please update state with a valid value")
        }

      } else {
        return res.send("User not authorized or Order not found")
      }

    } else {
      return res.send("Please provide both a User and Order ID")
    }

  } catch (error) {
    next(error)
  }
})


module.exports = router;