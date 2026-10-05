/* i18n.js — language switcher (EN / FR / IT / DE / ES) for vintage-posters.shop
   Works on every page: it translates by matching the English text, so the
   HTML does not need to be rewritten. Add to any page before </body>:
     <script src="i18n.js" defer></script>
   Direct links for ads:  https://vintage-posters.shop/?lang=fr  (also it, de, es, en)
   Public API: window.siteI18n.setLang('de'), window.siteI18n.translate('text') */
(function () {
  'use strict';
  const LANGS = ['en', 'fr', 'it', 'de', 'es'];
  const AUTO_DETECT = true; // false = start in English unless ?lang= or a saved choice

  // English text (or inline-HTML block) -> [fr, it, de, es]
  const T = {
 "Gallery": [
  "Galerie",
  "Galleria",
  "Galerie",
  "Galería"
 ],
 "Authenticity": [
  "Authenticité",
  "Autenticità",
  "Echtheit",
  "Autenticidad"
 ],
 "Contact & Help": [
  "Contact & Aide",
  "Contatti e Assistenza",
  "Kontakt & Hilfe",
  "Contacto y Ayuda"
 ],
 "Contact": [
  "Contact",
  "Contatti",
  "Kontakt",
  "Contacto"
 ],
 "Cart": [
  "Panier",
  "Carrello",
  "Warenkorb",
  "Carrito"
 ],
 "Shipping": [
  "Livraison",
  "Spedizione",
  "Versand",
  "Envío"
 ],
 "Returns": [
  "Retours",
  "Resi",
  "Rückgabe",
  "Devoluciones"
 ],
 "Privacy Policy": [
  "Politique de confidentialité",
  "Informativa sulla privacy",
  "Datenschutzerklärung",
  "Política de privacidad"
 ],
 "Terms": [
  "Conditions générales",
  "Termini e condizioni",
  "AGB",
  "Términos"
 ],
 "© 2025 Posters. All rights reserved.": [
  "© 2025 Posters. Tous droits réservés.",
  "© 2025 Posters. Tutti i diritti riservati.",
  "© 2025 Posters. Alle Rechte vorbehalten.",
  "© 2025 Posters. Todos los derechos reservados."
 ],
 "Your Cart": [
  "Votre panier",
  "Il tuo carrello",
  "Ihr Warenkorb",
  "Tu carrito"
 ],
 "Shipping Information": [
  "Informations de livraison",
  "Informazioni di spedizione",
  "Versandinformationen",
  "Información de envío"
 ],
 "Please fill in your delivery details to complete your order.": [
  "Veuillez renseigner vos informations de livraison pour finaliser votre commande.",
  "Inserisci i dati di consegna per completare l'ordine.",
  "Bitte geben Sie Ihre Lieferdaten ein, um Ihre Bestellung abzuschließen.",
  "Rellena tus datos de entrega para completar el pedido."
 ],
 "Full name": [
  "Nom complet",
  "Nome e cognome",
  "Vollständiger Name",
  "Nombre completo"
 ],
 "E-mail": [
  "E-mail",
  "E-mail",
  "E-Mail",
  "Correo electrónico"
 ],
 "Phone number": [
  "Numéro de téléphone",
  "Numero di telefono",
  "Telefonnummer",
  "Número de teléfono"
 ],
 "Delivery Address": [
  "Adresse de livraison",
  "Indirizzo di consegna",
  "Lieferadresse",
  "Dirección de entrega"
 ],
 "City / Town": [
  "Ville",
  "Città",
  "Stadt / Ort",
  "Ciudad / Localidad"
 ],
 "Region / State": [
  "Région / État",
  "Regione / Stato",
  "Region / Bundesland",
  "Región / Provincia"
 ],
 "Postal code": [
  "Code postal",
  "CAP",
  "Postleitzahl",
  "Código postal"
 ],
 "Country": [
  "Pays",
  "Paese",
  "Land",
  "País"
 ],
 "Send shipping details": [
  "Envoyer les informations de livraison",
  "Invia i dati di spedizione",
  "Versandangaben senden",
  "Enviar datos de envío"
 ],
 "Continue to secure checkout": [
  "Passer au paiement sécurisé",
  "Procedi al pagamento sicuro",
  "Weiter zur sicheren Kasse",
  "Continuar al pago seguro"
 ],
 "Secure payments are processed by <strong>Stripe</strong> (Visa, Mastercard, Apple Pay, Google Pay, Link, and more). For questions, contact us in the <a href=\"contact.html\" class=\"text-blue-600 underline\">Contact &amp; Help</a> section.": [
  "Les paiements sécurisés sont traités par <strong>Stripe</strong> (Visa, Mastercard, Apple Pay, Google Pay, Link, etc.). Pour toute question, contactez-nous dans la section <a href=\"contact.html\" class=\"text-blue-600 underline\">Contact &amp; Aide</a>.",
  "I pagamenti sicuri sono elaborati da <strong>Stripe</strong> (Visa, Mastercard, Apple Pay, Google Pay, Link e altri). Per qualsiasi domanda, contattaci nella sezione <a href=\"contact.html\" class=\"text-blue-600 underline\">Contatti e Assistenza</a>.",
  "Sichere Zahlungen werden von <strong>Stripe</strong> abgewickelt (Visa, Mastercard, Apple Pay, Google Pay, Link und mehr). Bei Fragen kontaktieren Sie uns im Bereich <a href=\"contact.html\" class=\"text-blue-600 underline\">Kontakt &amp; Hilfe</a>.",
  "Los pagos seguros se procesan a través de <strong>Stripe</strong> (Visa, Mastercard, Apple Pay, Google Pay, Link y más). Si tienes alguna duda, escríbenos en la sección <a href=\"contact.html\" class=\"text-blue-600 underline\">Contacto y Ayuda</a>."
 ],
 "Secure payments are processed by <strong>Stripe</strong>. For questions, contact us in the <a href=\"contact.html\" class=\"text-blue-600 underline\">Contact &amp; Help</a> section.": [
  "Les paiements sécurisés sont traités par <strong>Stripe</strong>. Pour toute question, contactez-nous dans la section <a href=\"contact.html\" class=\"text-blue-600 underline\">Contact &amp; Aide</a>.",
  "I pagamenti sicuri sono elaborati da <strong>Stripe</strong>. Per qualsiasi domanda, contattaci nella sezione <a href=\"contact.html\" class=\"text-blue-600 underline\">Contatti e Assistenza</a>.",
  "Sichere Zahlungen werden von <strong>Stripe</strong> abgewickelt. Bei Fragen kontaktieren Sie uns im Bereich <a href=\"contact.html\" class=\"text-blue-600 underline\">Kontakt &amp; Hilfe</a>.",
  "Los pagos seguros se procesan a través de <strong>Stripe</strong>. Si tienes alguna duda, escríbenos en la sección <a href=\"contact.html\" class=\"text-blue-600 underline\">Contacto y Ayuda</a>."
 ],
 "Leonetto Cappiello Original Vintage Posters & Art": [
  "Affiches anciennes originales Leonetto Cappiello & Art",
  "Manifesti d'epoca originali Leonetto Cappiello e Arte",
  "Original Vintage Plakate von Leonetto Cappiello & Kunst",
  "Leonetto Cappiello: carteles vintage originales y arte"
 ],
 "Discover original vintage posters, rare advertising art, and collectible historical pieces with worldwide shipping.": [
  "Découvrez des affiches vintage originales, de rares œuvres publicitaires et des pièces historiques de collection, avec livraison dans le monde entier.",
  "Scopri poster vintage originali, rara arte pubblicitaria e pezzi storici da collezione, con spedizione in tutto il mondo.",
  "Entdecken Sie originale Vintage-Plakate, seltene Werbekunst und historische Sammlerstücke mit weltweitem Versand.",
  "Descubre carteles vintage originales, arte publicitario poco común y piezas históricas de colección, con envío a todo el mundo."
 ],
 "Click to load more posters": [
  "Cliquez pour charger plus d'affiches",
  "Clicca per caricare altri poster",
  "Klicken, um weitere Plakate zu laden",
  "Haz clic para cargar más carteles"
 ],
 "Add to Cart": [
  "Ajouter au panier",
  "Aggiungi al carrello",
  "In den Warenkorb",
  "Añadir al carrito"
 ],
 "Free worldwide shipping & customs fees included": [
  "Livraison gratuite dans le monde entier, frais de douane inclus",
  "Spedizione gratuita in tutto il mondo, dazi doganali inclusi",
  "Kostenloser weltweiter Versand, Zollgebühren inklusive",
  "Envío gratuito a todo el mundo, aranceles de aduana incluidos"
 ],
 "I always combine shipping for saving postage expenses.": [
  "Je regroupe toujours les envois pour réduire les frais de port.",
  "Combino sempre le spedizioni per risparmiare sulle spese postali.",
  "Ich fasse Sendungen immer zusammen, um Portokosten zu sparen.",
  "Siempre combino los envíos para ahorrar en gastos de franqueo."
 ],
 "Item ships within 1 business day after the receipt of the payment.": [
  "L'article est expédié dans un délai de 1 jour ouvrable après réception du paiement.",
  "L'articolo viene spedito entro 1 giorno lavorativo dalla ricezione del pagamento.",
  "Der Artikel wird innerhalb von 1 Werktag nach Zahlungseingang versendet.",
  "El artículo se envía en un plazo de 1 día hábil tras la recepción del pago."
 ],
 "The item will be shipped by registered airmail by Ukrainian Postal Service.": [
  "L'article sera expédié par courrier aérien recommandé via la poste ukrainienne.",
  "L'articolo sarà spedito per posta aerea raccomandata tramite le Poste ucraine.",
  "Der Artikel wird als eingeschriebene Luftpost von der ukrainischen Post versendet.",
  "El artículo se enviará por correo aéreo certificado con el Servicio Postal Ucraniano."
 ],
 "Guaranteed Original Vintage Posters": [
  "Affiches vintage originales garanties",
  "Poster vintage originali garantiti",
  "Garantiert originale Vintage-Plakate",
  "Carteles vintage originales garantizados"
 ],
 "Every poster in our collection is an authentic historical original — never a reproduction.<br> We specialize in early 20th-century lithographs, primarily by Leonetto Cappiello and masters of the Belle Époque and interwar periods.": [
  "Chaque affiche de notre collection est un authentique original historique — jamais une reproduction.<br> Nous nous spécialisons dans les lithographies du début du XXe siècle, principalement de Leonetto Cappiello et des maîtres de la Belle Époque et de l'entre-deux-guerres.",
  "Ogni poster della nostra collezione è un autentico originale storico — mai una riproduzione.<br> Siamo specializzati in litografie dell'inizio del XX secolo, principalmente di Leonetto Cappiello e dei maestri della Belle Époque e del periodo tra le due guerre.",
  "Jedes Plakat in unserer Sammlung ist ein authentisches historisches Original — niemals eine Reproduktion.<br> Wir sind auf Lithografien des frühen 20. Jahrhunderts spezialisiert, vor allem von Leonetto Cappiello und den Meistern der Belle Époque und der Zwischenkriegszeit.",
  "Cada cartel de nuestra colección es un original histórico auténtico, nunca una reproducción.<br> Nos especializamos en litografías de principios del siglo XX, principalmente de Leonetto Cappiello y de los maestros de la Belle Époque y del periodo de entreguerras."
 ],
 "Original Vintage Posters": [
  "Affiches vintage originales",
  "Poster vintage originali",
  "Original Vintage-Plakate",
  "Carteles vintage originales"
 ],
 "Vintage posters are more than advertisements — they are artifacts of art, design, and social history. Created between 1890 and 1950, they capture moments of cultural change through bold visuals and innovative printing.": [
  "Les affiches vintage sont bien plus que de la publicité : ce sont des témoignages de l'art, du design et de l'histoire sociale. Créées entre 1890 et 1950, elles saisissent des moments de changement culturel grâce à des visuels audacieux et à une impression innovante.",
  "I poster vintage sono molto più di semplici annunci pubblicitari: sono testimonianze di arte, design e storia sociale. Realizzati tra il 1890 e il 1950, catturano momenti di cambiamento culturale attraverso immagini audaci e tecniche di stampa innovative.",
  "Vintage-Plakate sind mehr als Werbung — sie sind Zeugnisse von Kunst, Design und Sozialgeschichte. Zwischen 1890 und 1950 entstanden, fangen sie Momente des kulturellen Wandels durch kühne Bildsprache und innovative Drucktechniken ein.",
  "Los carteles vintage son mucho más que anuncios: son piezas de arte, diseño e historia social. Creados entre 1890 y 1950, recogen momentos de cambio cultural mediante imágenes audaces e impresión innovadora."
 ],
 "Our collection focuses on original lithographs and other period techniques from the golden age of poster art, with particular emphasis on the work of Leonetto Cappiello — widely regarded as the father of modern advertising poster design.": [
  "Notre collection se concentre sur des lithographies originales et d'autres techniques d'époque issues de l'âge d'or de l'affiche, avec un accent particulier sur l'œuvre de Leonetto Cappiello, largement considéré comme le père de l'affiche publicitaire moderne.",
  "La nostra collezione si concentra su litografie originali e altre tecniche d'epoca dell'età d'oro del manifesto, con particolare attenzione all'opera di Leonetto Cappiello, considerato il padre del moderno manifesto pubblicitario.",
  "Unsere Sammlung konzentriert sich auf Originallithografien und andere zeitgenössische Techniken aus dem goldenen Zeitalter der Plakatkunst, mit besonderem Schwerpunkt auf dem Werk von Leonetto Cappiello — weithin als Vater des modernen Werbeplakats angesehen.",
  "Nuestra colección se centra en litografías originales y otras técnicas de la época dorada del cartel, con especial atención a la obra de Leonetto Cappiello, considerado ampliamente el padre del cartel publicitario moderno."
 ],
 "Condition Assessment": [
  "Évaluation de l'état",
  "Valutazione delle condizioni",
  "Zustandsbewertung",
  "Evaluación del estado"
 ],
 "We use a standard international grading system (A–C) with +/- modifiers:": [
  "Nous utilisons un système de notation international standard (A à C) avec des modificateurs +/- :",
  "Utilizziamo un sistema di classificazione internazionale standard (A–C) con modificatori +/-:",
  "Wir verwenden ein internationales Standard-Bewertungssystem (A–C) mit +/- Abstufungen:",
  "Utilizamos un sistema internacional estándar de clasificación (A–C) con modificadores +/-:"
 ],
 "Near perfect to excellent: fresh colors, minimal or no defects, bright paper.": [
  "Quasi parfait à excellent : couleurs fraîches, défauts minimes ou inexistants, papier lumineux.",
  "Quasi perfetto o eccellente: colori freschi, difetti minimi o assenti, carta luminosa.",
  "Nahezu perfekt bis ausgezeichnet: frische Farben, minimale oder keine Mängel, helles Papier.",
  "Casi perfecto a excelente: colores frescos, defectos mínimos o inexistentes, papel luminoso."
 ],
 "Very good: small tears, pinholes, light foxing, faint fold marks or minor restoration possible.": [
  "Très bon : petites déchirures, trous d'épingle, légères rousseurs, légères marques de pliure ou restauration mineure possibles.",
  "Molto buono: possibili piccoli strappi, forellini, lieve foxing, lievi segni di piega o piccoli restauri.",
  "Sehr gut: kleine Einrisse, Nadellöcher, leichter Stockfleck, schwache Faltspuren oder geringfügige Restaurierung möglich.",
  "Muy bueno: pequeños desgarros, agujeritos, ligeras manchas de foxing, marcas de pliegue tenues o posible restauración menor."
 ],
 "Fair to good: visible folds, stains, small restored areas, faded colors, but still collectible.": [
  "Assez bon à bon : plis visibles, taches, petites zones restaurées, couleurs passées, mais toujours collectionnable.",
  "Discreto o buono: pieghe visibili, macchie, piccole aree restaurate, colori sbiaditi, ma ancora da collezione.",
  "Ordentlich bis gut: sichtbare Falten, Flecken, kleine restaurierte Stellen, verblasste Farben, aber weiterhin sammelwürdig.",
  "Aceptable a bueno: pliegues visibles, manchas, pequeñas zonas restauradas, colores desvaídos, pero aun así coleccionable."
 ],
 "Significant damage or restoration, but main image intact. We rarely offer C-grade posters.": [
  "Dommages ou restauration importants, mais l'image principale reste intacte. Nous proposons rarement des affiches de grade C.",
  "Danni o restauri significativi, ma l'immagine principale è intatta. Raramente offriamo poster di grado C.",
  "Erhebliche Schäden oder Restaurierung, das Hauptmotiv ist jedoch intakt. Plakate der Güteklasse C bieten wir nur selten an.",
  "Daños o restauración importantes, pero la imagen principal está intacta. Rara vez ofrecemos carteles de grado C."
 ],
 "We do not offer poor condition (D-grade) posters. All items are photographed honestly from multiple angles, including margins.": [
  "Nous ne proposons pas d'affiches en mauvais état (grade D). Tous les articles sont photographiés honnêtement sous plusieurs angles, y compris les marges.",
  "Non offriamo poster in cattive condizioni (grado D). Tutti gli articoli sono fotografati in modo onesto da più angolazioni, margini inclusi.",
  "Wir bieten keine Plakate in schlechtem Zustand (Güteklasse D) an. Alle Artikel werden ehrlich aus mehreren Blickwinkeln fotografiert, einschließlich der Ränder.",
  "No ofrecemos carteles en mal estado (grado D). Todos los artículos se fotografían con total honestidad desde varios ángulos, incluidos los márgenes."
 ],
 "Printing Techniques": [
  "Techniques d'impression",
  "Tecniche di stampa",
  "Drucktechniken",
  "Técnicas de impresión"
 ],
 "Lithography (on limestone)": [
  "Lithographie (sur pierre calcaire)",
  "Litografia (su pietra calcarea)",
  "Lithografie (auf Kalkstein)",
  "Litografía (sobre piedra caliza)"
 ],
 "Lithography was the main technique for printing posters up to the 1950s. Highly valued for the prestige of limestone, it required skillful craftsmanship. Lithographers, often anonymous, combined artistry and technical expertise. Printing a poster could take weeks: the motif was drawn on a porous stone with lithographic crayons, then colored inks (made from natural pigments with an oil base) were applied. The stone was dampened, and paper pressed onto it, transferring ink from the non-porous areas. Each color was printed separately, with precise positioning marks guiding the process to a tenth of a millimeter. Richly pigmented inks produced subtle tones and exceptional finish, making lithographs highly prized well into the 1960s.": [
  "La lithographie fut la principale technique d'impression des affiches jusque dans les années 1950. Très appréciée pour le prestige de la pierre calcaire, elle exigeait un grand savoir-faire. Les lithographes, souvent anonymes, alliaient talent artistique et expertise technique. L'impression d'une affiche pouvait prendre des semaines : le motif était dessiné sur une pierre poreuse avec des crayons lithographiques, puis des encres colorées (fabriquées à partir de pigments naturels à base d'huile) étaient appliquées. La pierre était humidifiée et le papier pressé dessus, ce qui transférait l'encre depuis les zones non poreuses. Chaque couleur était imprimée séparément, des repères de positionnement guidant le processus au dixième de millimètre près. Des encres richement pigmentées produisaient des tons subtils et une finition exceptionnelle, faisant des lithographies des pièces très recherchées jusque dans les années 1960.",
  "La litografia fu la tecnica principale per la stampa dei manifesti fino agli anni Cinquanta. Molto apprezzata per il prestigio della pietra calcarea, richiedeva grande maestria artigianale. I litografi, spesso anonimi, univano talento artistico e competenza tecnica. La stampa di un manifesto poteva richiedere settimane: il motivo veniva disegnato su una pietra porosa con matite litografiche, poi si applicavano inchiostri colorati (ottenuti da pigmenti naturali a base oleosa). La pietra veniva inumidita e la carta pressata su di essa, trasferendo l'inchiostro dalle aree non porose. Ogni colore veniva stampato separatamente, con precisi segni di registro che guidavano il processo al decimo di millimetro. Inchiostri riccamente pigmentati producevano toni sottili e una finitura eccezionale, rendendo le litografie molto ricercate fino agli anni Sessanta.",
  "Die Lithografie war bis in die 1950er Jahre die wichtigste Technik zum Drucken von Plakaten. Wegen des Prestiges des Kalksteins hoch geschätzt, erforderte sie handwerkliches Geschick. Die oft anonymen Lithografen verbanden künstlerisches Können mit technischer Expertise. Der Druck eines Plakats konnte Wochen dauern: Das Motiv wurde mit lithografischen Kreiden auf einen porösen Stein gezeichnet, anschließend wurden farbige Druckfarben (aus natürlichen Pigmenten auf Ölbasis) aufgetragen. Der Stein wurde angefeuchtet und das Papier daraufgepresst, wobei die Farbe von den nicht porösen Stellen übertragen wurde. Jede Farbe wurde einzeln gedruckt, wobei präzise Passermarken den Vorgang auf den Zehntelmillimeter genau steuerten. Kräftig pigmentierte Farben erzeugten feine Töne und eine außergewöhnliche Ausführung, weshalb Lithografien noch bis in die 1960er Jahre hoch geschätzt wurden.",
  "La litografía fue la técnica principal de impresión de carteles hasta la década de 1950. Muy apreciada por el prestigio de la piedra caliza, requería una artesanía hábil. Los litógrafos, a menudo anónimos, combinaban arte y pericia técnica. Imprimir un cartel podía llevar semanas: el motivo se dibujaba sobre una piedra porosa con lápices litográficos y después se aplicaban tintas de colores (elaboradas con pigmentos naturales de base oleosa). Se humedecía la piedra y se presionaba el papel sobre ella, de modo que la tinta se transfería desde las zonas no porosas. Cada color se imprimía por separado, con marcas de registro precisas que guiaban el proceso con una exactitud de una décima de milímetro. Las tintas ricas en pigmento producían tonos sutiles y un acabado excepcional, por lo que las litografías fueron muy apreciadas hasta bien entrada la década de 1960."
 ],
 "Offset Printing": [
  "Impression offset",
  "Stampa offset",
  "Offsetdruck",
  "Impresión offset"
 ],
 "Offset printing emerged between the World Wars as a faster, more efficient alternative to lithography. Using the four-color CMYK process (cyan, magenta, yellow, black) and acetate films prepared photographically, it enabled high-quality color reproduction. Distinctive dot patterns characterize offset prints, which became standard for advertising boards after World War II.": [
  "L'impression offset est apparue entre les deux guerres mondiales comme une alternative plus rapide et plus efficace à la lithographie. Grâce à la quadrichromie CMJN (cyan, magenta, jaune, noir) et à des films d'acétate préparés photographiquement, elle permettait une reproduction des couleurs de haute qualité. Des trames de points caractéristiques distinguent les impressions offset, devenues la norme pour les panneaux publicitaires après la Seconde Guerre mondiale.",
  "La stampa offset nacque tra le due guerre mondiali come alternativa più rapida ed efficiente alla litografia. Utilizzando il processo quadricromico CMYK (ciano, magenta, giallo, nero) e pellicole all'acetato preparate fotograficamente, permetteva una riproduzione dei colori di alta qualità. Caratteristici motivi a puntini contraddistinguono le stampe offset, divenute lo standard per i cartelloni pubblicitari dopo la seconda guerra mondiale.",
  "Der Offsetdruck entstand zwischen den Weltkriegen als schnellere und effizientere Alternative zur Lithografie. Mit dem Vierfarbprozess CMYK (Cyan, Magenta, Gelb, Schwarz) und fotografisch hergestellten Acetatfilmen ermöglichte er eine hochwertige Farbwiedergabe. Charakteristische Rasterpunkte kennzeichnen Offsetdrucke, die nach dem Zweiten Weltkrieg zum Standard für Werbetafeln wurden.",
  "La impresión offset surgió entre las dos guerras mundiales como una alternativa más rápida y eficiente a la litografía. Mediante el proceso de cuatricromía CMYK (cian, magenta, amarillo, negro) y películas de acetato preparadas fotográficamente, permitía una reproducción del color de alta calidad. Las tramas de puntos características distinguen las impresiones offset, que se convirtieron en el estándar de las vallas publicitarias después de la Segunda Guerra Mundial."
 ],
 "Heliography / Rotogravure": [
  "Héliographie / Rotogravure",
  "Eliografia / Rotocalco",
  "Heliografie / Rotationstiefdruck",
  "Heliografía / Huecograbado"
 ],
 "Invented by Nicéphore Niépce around 1822, heliography was a precursor to photographic prints. Light-exposed areas hardened on a reactive surface, then transferred to paper. Pre-1940 photographic posters often used copper plates with reactive coatings, etched by acid and retouched by hand. This technique, still used in newspapers and magazines, allowed high-quality prints in larger quantities and gave posters a unique artistic charm.": [
  "Inventée par Nicéphore Niépce vers 1822, l'héliographie fut une précurseure de l'impression photographique. Les zones exposées à la lumière durcissaient sur une surface réactive, puis étaient transférées sur le papier. Avant 1940, les affiches photographiques utilisaient souvent des plaques de cuivre à revêtement réactif, gravées à l'acide et retouchées à la main. Cette technique, encore utilisée dans les journaux et les magazines, permettait des impressions de haute qualité en plus grandes quantités et donnait aux affiches un charme artistique unique.",
  "Inventata da Nicéphore Niépce intorno al 1822, l'eliografia fu un precursore della stampa fotografica. Le aree esposte alla luce si indurivano su una superficie reattiva e venivano poi trasferite sulla carta. I manifesti fotografici precedenti al 1940 utilizzavano spesso lastre di rame con rivestimenti reattivi, incise con l'acido e ritoccate a mano. Questa tecnica, ancora usata nei giornali e nelle riviste, consentiva stampe di alta qualità in quantità maggiori e conferiva ai manifesti un fascino artistico unico.",
  "Die um 1822 von Nicéphore Niépce erfundene Heliografie war ein Vorläufer des fotografischen Drucks. Lichtbelichtete Bereiche härteten auf einer reaktiven Oberfläche aus und wurden anschließend auf Papier übertragen. Fotografische Plakate vor 1940 verwendeten oft Kupferplatten mit reaktiver Beschichtung, die mit Säure geätzt und von Hand retuschiert wurden. Diese Technik, die noch heute in Zeitungen und Zeitschriften eingesetzt wird, ermöglichte hochwertige Drucke in größerer Stückzahl und verlieh den Plakaten einen einzigartigen künstlerischen Reiz.",
  "Inventada por Nicéphore Niépce hacia 1822, la heliografía fue precursora de las impresiones fotográficas. Las zonas expuestas a la luz se endurecían sobre una superficie reactiva y luego se transferían al papel. Los carteles fotográficos anteriores a 1940 solían usar planchas de cobre con recubrimientos reactivos, grabadas con ácido y retocadas a mano. Esta técnica, que aún se usa en periódicos y revistas, permitía impresiones de alta calidad en mayores cantidades y daba a los carteles un encanto artístico único."
 ],
 "Screen Printing": [
  "Sérigraphie",
  "Serigrafia",
  "Siebdruck",
  "Serigrafía"
 ],
 "Screen printing uses silk or synthetic cloth stretched over a frame to transfer ink color by color. Originating in China, it gained popularity in the West during WWII and became iconic for Pop Art (Warhol, Lichtenstein). This method creates vivid, uniform colors, with fine texture visible under magnification. Small editions and modern artistic posters continue to use this technique.": [
  "La sérigraphie utilise un tissu de soie ou synthétique tendu sur un cadre pour transférer l'encre couleur par couleur. Originaire de Chine, elle s'est répandue en Occident pendant la Seconde Guerre mondiale et est devenue emblématique du Pop Art (Warhol, Lichtenstein). Cette méthode produit des couleurs vives et uniformes, avec une fine texture visible à la loupe. Les petites éditions et les affiches artistiques modernes continuent d'utiliser cette technique.",
  "La serigrafia utilizza un tessuto di seta o sintetico teso su un telaio per trasferire l'inchiostro colore per colore. Originaria della Cina, si diffuse in Occidente durante la seconda guerra mondiale e divenne iconica per la Pop Art (Warhol, Lichtenstein). Questo metodo crea colori vividi e uniformi, con una fine texture visibile con l'ingrandimento. Piccole edizioni e poster artistici moderni continuano a utilizzare questa tecnica.",
  "Beim Siebdruck wird ein über einen Rahmen gespanntes Seiden- oder Kunststoffgewebe verwendet, um die Farbe Schicht für Schicht zu übertragen. Aus China stammend, wurde er im Westen während des Zweiten Weltkriegs populär und wurde zum Markenzeichen der Pop-Art (Warhol, Lichtenstein). Diese Methode erzeugt lebhafte, gleichmäßige Farben mit einer feinen Textur, die unter Vergrößerung sichtbar ist. Kleine Auflagen und moderne Kunstplakate nutzen diese Technik weiterhin.",
  "La serigrafía utiliza seda o tela sintética tensada sobre un marco para transferir la tinta color por color. Originaria de China, ganó popularidad en Occidente durante la Segunda Guerra Mundial y se convirtió en un símbolo del Pop Art (Warhol, Lichtenstein). Este método crea colores vivos y uniformes, con una textura fina visible al ampliarlos. Las tiradas pequeñas y los carteles artísticos modernos siguen empleando esta técnica."
 ],
 "Other / Mixed Techniques": [
  "Autres techniques / techniques mixtes",
  "Altre tecniche / tecniche miste",
  "Andere / gemischte Techniken",
  "Otras técnicas / Técnicas mixtas"
 ],
 "Some posters result from hybrid or artisanal processes. While we determine the most likely technique, exact methods are not always certain. Such works are labeled as “other technique” or “mixed technique.”": [
  "Certaines affiches résultent de procédés hybrides ou artisanaux. Bien que nous déterminions la technique la plus probable, les méthodes exactes ne sont pas toujours certaines. Ces œuvres sont qualifiées d'« autre technique » ou de « technique mixte ».",
  "Alcuni poster derivano da processi ibridi o artigianali. Pur individuando la tecnica più probabile, i metodi esatti non sono sempre certi. Tali opere sono indicate come «altra tecnica» o «tecnica mista».",
  "Manche Plakate entstehen in hybriden oder handwerklichen Verfahren. Wir bestimmen zwar die wahrscheinlichste Technik, die genauen Methoden sind jedoch nicht immer sicher. Solche Werke werden als „andere Technik“ oder „gemischte Technik“ bezeichnet.",
  "Algunos carteles son el resultado de procesos híbridos o artesanales. Aunque determinamos la técnica más probable, los métodos exactos no siempre son seguros. Estas obras se etiquetan como «otra técnica» o «técnica mixta»."
 ],
 "Discover Authentic Originals": [
  "Découvrez d'authentiques originaux",
  "Scopri autentici originali",
  "Entdecken Sie authentische Originale",
  "Descubre originales auténticos"
 ],
 "View the Collection": [
  "Voir la collection",
  "Visualizza la collezione",
  "Sammlung ansehen",
  "Ver la colección"
 ],
 "Shipping & Payment Information": [
  "Informations sur la livraison et le paiement",
  "Informazioni su spedizione e pagamento",
  "Informationen zu Versand und Zahlung",
  "Información de envío y pago"
 ],
 "NO ADDITIONAL COSTS!": [
  "AUCUN FRAIS SUPPLÉMENTAIRE !",
  "NESSUN COSTO AGGIUNTIVO!",
  "KEINE ZUSÄTZLICHEN KOSTEN!",
  "¡SIN COSTES ADICIONALES!"
 ],
 "The buyer pays only the price of the poster. <strong class=\"text-blue-400\">ALL ADDITIONAL COSTS SUCH AS CUSTOMS DUTIES AND SHIPPING ARE COVERED BY US.</strong>": [
  "L'acheteur ne paie que le prix de l'affiche. <strong class=\"text-blue-400\">TOUS LES FRAIS SUPPLÉMENTAIRES, TELS QUE LES DROITS DE DOUANE ET LA LIVRAISON, SONT PRIS EN CHARGE PAR NOS SOINS.</strong>",
  "L'acquirente paga solo il prezzo del poster. <strong class=\"text-blue-400\">TUTTI I COSTI AGGIUNTIVI, COME DAZI DOGANALI E SPEDIZIONE, SONO A NOSTRO CARICO.</strong>",
  "Der Käufer zahlt nur den Preis des Plakats. <strong class=\"text-blue-400\">ALLE ZUSÄTZLICHEN KOSTEN WIE ZOLLGEBÜHREN UND VERSAND ÜBERNEHMEN WIR.</strong>",
  "El comprador solo paga el precio del cartel. <strong class=\"text-blue-400\">TODOS LOS COSTES ADICIONALES, COMO LOS ARANCELES DE ADUANA Y EL ENVÍO, CORREN POR NUESTRA CUENTA.</strong>"
 ],
 "Delivery speed depends on the address provided.": [
  "La rapidité de livraison dépend de l'adresse indiquée.",
  "La velocità di consegna dipende dall'indirizzo fornito.",
  "Die Lieferzeit hängt von der angegebenen Adresse ab.",
  "El plazo de entrega depende de la dirección indicada."
 ],
 "We always combine shipping to save postage expenses. Items ship within <strong class=\"text-blue-400 font-semibold\">1–2 business days</strong> after payment is received via <strong class=\"text-gray-200\">registered airmail by Ukrainian Postal Service</strong>.": [
  "Nous regroupons toujours les envois pour réduire les frais de port. Les articles sont expédiés sous <strong class=\"text-blue-400 font-semibold\">1 à 2 jours ouvrables</strong> après réception du paiement, par <strong class=\"text-gray-200\">courrier aérien recommandé via la poste ukrainienne</strong>.",
  "Combiniamo sempre le spedizioni per risparmiare sulle spese postali. Gli articoli vengono spediti entro <strong class=\"text-blue-400 font-semibold\">1–2 giorni lavorativi</strong> dalla ricezione del pagamento, tramite <strong class=\"text-gray-200\">posta aerea raccomandata delle Poste ucraine</strong>.",
  "Wir fassen Sendungen immer zusammen, um Portokosten zu sparen. Die Artikel werden innerhalb von <strong class=\"text-blue-400 font-semibold\">1–2 Werktagen</strong> nach Zahlungseingang per <strong class=\"text-gray-200\">eingeschriebener Luftpost der ukrainischen Post</strong> versendet.",
  "Siempre combinamos los envíos para ahorrar en gastos de franqueo. Los artículos se envían en un plazo de <strong class=\"text-blue-400 font-semibold\">1–2 días hábiles</strong> tras recibir el pago, por <strong class=\"text-gray-200\">correo aéreo certificado del Servicio Postal Ucraniano</strong>."
 ],
 "Estimated delivery times:": [
  "Délais de livraison estimés :",
  "Tempi di consegna stimati:",
  "Voraussichtliche Lieferzeiten:",
  "Plazos de entrega estimados:"
 ],
 "USA, Canada, Australia, Japan: <strong class=\"text-blue-400\">12–20 business days</strong>": [
  "États-Unis, Canada, Australie, Japon : <strong class=\"text-blue-400\">12 à 20 jours ouvrables</strong>",
  "USA, Canada, Australia, Giappone: <strong class=\"text-blue-400\">12–20 giorni lavorativi</strong>",
  "USA, Kanada, Australien, Japan: <strong class=\"text-blue-400\">12–20 Werktage</strong>",
  "EE. UU., Canadá, Australia, Japón: <strong class=\"text-blue-400\">12–20 días hábiles</strong>"
 ],
 "Europe: <strong class=\"text-blue-400\">7–15 business days</strong>": [
  "Europe : <strong class=\"text-blue-400\">7 à 15 jours ouvrables</strong>",
  "Europa: <strong class=\"text-blue-400\">7–15 giorni lavorativi</strong>",
  "Europa: <strong class=\"text-blue-400\">7–15 Werktage</strong>",
  "Europa: <strong class=\"text-blue-400\">7–15 días hábiles</strong>"
 ],
 "Tracking Information:": [
  "Informations de suivi :",
  "Informazioni sul tracciamento:",
  "Sendungsverfolgung:",
  "Información de seguimiento:"
 ],
 "After shipping, the tracking number will be sent to your email provided at checkout.": [
  "Après l'expédition, le numéro de suivi sera envoyé à l'adresse e-mail indiquée lors du paiement.",
  "Dopo la spedizione, il numero di tracciamento verrà inviato all'indirizzo e-mail indicato al momento del pagamento.",
  "Nach dem Versand wird die Sendungsnummer an die beim Bezahlvorgang angegebene E-Mail-Adresse gesendet.",
  "Tras el envío, te enviaremos el número de seguimiento al correo electrónico que indicaste al finalizar la compra."
 ],
 "You can also track your order directly via the Ukrainian Postal Service website:": [
  "Vous pouvez également suivre votre commande directement sur le site de la poste ukrainienne :",
  "Puoi anche tracciare il tuo ordine direttamente sul sito delle Poste ucraine:",
  "Sie können Ihre Bestellung auch direkt auf der Website der ukrainischen Post verfolgen:",
  "También puedes seguir tu pedido directamente en el sitio web del Servicio Postal Ucraniano:"
 ],
 "Track Your Package": [
  "Suivre votre colis",
  "Traccia il tuo pacco",
  "Sendung verfolgen",
  "Seguir tu paquete"
 ],
 "Send a Message": [
  "Envoyer un message",
  "Invia un messaggio",
  "Nachricht senden",
  "Enviar un mensaje"
 ],
 "Have a question about your order, returns, or want to suggest a new design? We'd love to hear from you!": [
  "Une question sur votre commande, un retour, ou une idée de nouveau design à suggérer ? Nous serions ravis de vous lire !",
  "Hai domande sul tuo ordine o sui resi, oppure vuoi suggerire un nuovo design? Ci farebbe piacere sentirti!",
  "Haben Sie eine Frage zu Ihrer Bestellung oder zu Rücksendungen, oder möchten Sie ein neues Design vorschlagen? Wir freuen uns auf Ihre Nachricht!",
  "¿Tienes alguna pregunta sobre tu pedido o las devoluciones, o quieres sugerir un nuevo diseño? ¡Nos encantará saber de ti!"
 ],
 "<i class=\"fas fa-info-circle mr-2\"></i> We typically respond within <strong>1–4 business days</strong>.": [
  "<i class=\"fas fa-info-circle mr-2\"></i> Nous répondons généralement sous <strong>1 à 4 jours ouvrables</strong>.",
  "<i class=\"fas fa-info-circle mr-2\"></i> Rispondiamo di solito entro <strong>1–4 giorni lavorativi</strong>.",
  "<i class=\"fas fa-info-circle mr-2\"></i> Wir antworten in der Regel innerhalb von <strong>1–4 Werktagen</strong>.",
  "<i class=\"fas fa-info-circle mr-2\"></i> Normalmente respondemos en un plazo de <strong>1–4 días hábiles</strong>."
 ],
 "Name": [
  "Nom",
  "Nome",
  "Name",
  "Nombre"
 ],
 "Email": [
  "E-mail",
  "E-mail",
  "E-Mail",
  "Correo electrónico"
 ],
 "Subject": [
  "Objet",
  "Oggetto",
  "Betreff",
  "Asunto"
 ],
 "Select a subject": [
  "Choisir un objet",
  "Seleziona un oggetto",
  "Betreff auswählen",
  "Selecciona un asunto"
 ],
 "General Inquiry": [
  "Demande générale",
  "Richiesta generale",
  "Allgemeine Anfrage",
  "Consulta general"
 ],
 "Order Question": [
  "Question sur une commande",
  "Domanda su un ordine",
  "Frage zur Bestellung",
  "Pregunta sobre un pedido"
 ],
 "Poster Suggestion": [
  "Suggestion d'affiche",
  "Suggerimento di poster",
  "Plakatvorschlag",
  "Sugerencia de cartel"
 ],
 "Custom Order": [
  "Commande personnalisée",
  "Ordine personalizzato",
  "Sonderbestellung",
  "Pedido personalizado"
 ],
 "Wholesale Inquiry": [
  "Demande de vente en gros",
  "Richiesta all'ingrosso",
  "Großhandelsanfrage",
  "Consulta mayorista"
 ],
 "Other": [
  "Autre",
  "Altro",
  "Sonstiges",
  "Otro"
 ],
 "Message (max 5000 characters)": [
  "Message (5000 caractères maximum)",
  "Messaggio (massimo 5000 caratteri)",
  "Nachricht (max. 5000 Zeichen)",
  "Mensaje (máx. 5000 caracteres)"
 ],
 "/5000 characters": [
  "/5000 caractères",
  "/5000 caratteri",
  "/5000 Zeichen",
  "/5000 caracteres"
 ],
 "Send Message": [
  "Envoyer le message",
  "Invia messaggio",
  "Nachricht senden",
  "Enviar mensaje"
 ],
 "Thank you! We’ll get back to you soon.": [
  "Merci ! Nous vous répondrons bientôt.",
  "Grazie! Ti risponderemo presto.",
  "Vielen Dank! Wir melden uns bald bei Ihnen.",
  "¡Gracias! Te responderemos pronto."
 ],
 "Email Us": [
  "Écrivez-nous",
  "Scrivici",
  "Schreiben Sie uns",
  "Escríbenos"
 ],
 "Reach out at <a href=\"mailto:pliesen@proton.me\" class=\"text-blue-400 underline\">pliesen@proton.me</a>": [
  "Contactez-nous à <a href=\"mailto:pliesen@proton.me\" class=\"text-blue-400 underline\">pliesen@proton.me</a>",
  "Scrivici a <a href=\"mailto:pliesen@proton.me\" class=\"text-blue-400 underline\">pliesen@proton.me</a>",
  "Erreichen Sie uns unter <a href=\"mailto:pliesen@proton.me\" class=\"text-blue-400 underline\">pliesen@proton.me</a>",
  "Escríbenos a <a href=\"mailto:pliesen@proton.me\" class=\"text-blue-400 underline\">pliesen@proton.me</a>"
 ],
 "Fast Shipping": [
  "Expédition rapide",
  "Spedizione rapida",
  "Schneller Versand",
  "Envío rápido"
 ],
 "Items ship within <strong>1–2 business days</strong>": [
  "Les articles sont expédiés sous <strong>1 à 2 jours ouvrables</strong>",
  "Gli articoli vengono spediti entro <strong>1–2 giorni lavorativi</strong>",
  "Artikel werden innerhalb von <strong>1–2 Werktagen</strong> versendet",
  "Los artículos se envían en <strong>1–2 días hábiles</strong>"
 ],
 "Quick Response": [
  "Réponse rapide",
  "Risposta rapida",
  "Schnelle Antwort",
  "Respuesta rápida"
 ],
 "We reply to all inquiries within <strong>1–4 business days</strong>": [
  "Nous répondons à toutes les demandes sous <strong>1 à 4 jours ouvrables</strong>",
  "Rispondiamo a tutte le richieste entro <strong>1–4 giorni lavorativi</strong>",
  "Wir beantworten alle Anfragen innerhalb von <strong>1–4 Werktagen</strong>",
  "Respondemos a todas las consultas en <strong>1–4 días hábiles</strong>"
 ],
 "Sorry, there was an error sending your message. Please try again.": [
  "Désolé, une erreur s'est produite lors de l'envoi de votre message. Veuillez réessayer.",
  "Spiacenti, si è verificato un errore durante l'invio del messaggio. Riprova.",
  "Leider ist beim Senden Ihrer Nachricht ein Fehler aufgetreten. Bitte versuchen Sie es erneut.",
  "Lo sentimos, se produjo un error al enviar tu mensaje. Inténtalo de nuevo."
 ],
 "We ship worldwide. All posters are carefully packed in protective tubes or flat packaging depending on size and condition.": [
  "Nous expédions dans le monde entier. Toutes les affiches sont soigneusement emballées dans des tubes de protection ou à plat, selon leur taille et leur état.",
  "Spediamo in tutto il mondo. Tutti i poster sono accuratamente imballati in tubi protettivi o in confezioni piatte, a seconda delle dimensioni e delle condizioni.",
  "Wir versenden weltweit. Alle Plakate werden je nach Größe und Zustand sorgfältig in Schutzrollen oder flach verpackt.",
  "Enviamos a todo el mundo. Todos los carteles se embalan con cuidado en tubos protectores o en embalaje plano, según el tamaño y el estado."
 ],
 "Processing Time": [
  "Délai de traitement",
  "Tempi di elaborazione",
  "Bearbeitungszeit",
  "Tiempo de preparación"
 ],
 "Orders are prepared within 1 business day after payment confirmation.": [
  "Les commandes sont préparées dans un délai de 1 jour ouvrable après confirmation du paiement.",
  "Gli ordini vengono preparati entro 1 giorno lavorativo dalla conferma del pagamento.",
  "Bestellungen werden innerhalb von 1 Werktag nach Zahlungsbestätigung vorbereitet.",
  "Los pedidos se preparan en 1 día hábil tras la confirmación del pago."
 ],
 "Estimated Delivery Time": [
  "Délai de livraison estimé",
  "Tempi di consegna stimati",
  "Voraussichtliche Lieferzeit",
  "Plazo de entrega estimado"
 ],
 "Europe: 7–15 business days": [
  "Europe : 7 à 15 jours ouvrables",
  "Europa: 7–15 giorni lavorativi",
  "Europa: 7–15 Werktage",
  "Europa: 7–15 días hábiles"
 ],
 "USA, Canada, Australia: 12–20 business days": [
  "États-Unis, Canada, Australie : 12 à 20 jours ouvrables",
  "USA, Canada, Australia: 12–20 giorni lavorativi",
  "USA, Kanada, Australien: 12–20 Werktage",
  "EE. UU., Canadá, Australia: 12–20 días hábiles"
 ],
 "Other countries: 10–25 business days": [
  "Autres pays : 10 à 25 jours ouvrables",
  "Altri paesi: 10–25 giorni lavorativi",
  "Andere Länder: 10–25 Werktage",
  "Otros países: 10–25 días hábiles"
 ],
 "Customs": [
  "Douanes",
  "Dogana",
  "Zoll",
  "Aduanas"
 ],
 "All customs fees and import duties are included in the price when applicable.": [
  "Tous les frais de douane et droits d'importation sont inclus dans le prix, le cas échéant.",
  "Tutti i dazi doganali e le tasse di importazione sono inclusi nel prezzo, ove applicabili.",
  "Alle Zollgebühren und Einfuhrabgaben sind gegebenenfalls im Preis enthalten.",
  "Todos los aranceles de aduana y derechos de importación están incluidos en el precio cuando corresponda."
 ],
 "Returns & Refund Policy": [
  "Politique de retour et de remboursement",
  "Politica di reso e rimborso",
  "Rückgabe- und Erstattungsbedingungen",
  "Política de devoluciones y reembolsos"
 ],
 "Return Period": [
  "Délai de retour",
  "Periodo di reso",
  "Rückgabefrist",
  "Plazo de devolución"
 ],
 "We accept returns within <strong>14 days</strong> after the item has been delivered.": [
  "Nous acceptons les retours dans les <strong>14 jours</strong> suivant la livraison de l'article.",
  "Accettiamo resi entro <strong>14 giorni</strong> dalla consegna dell'articolo.",
  "Wir akzeptieren Rücksendungen innerhalb von <strong>14 Tagen</strong> nach Lieferung des Artikels.",
  "Aceptamos devoluciones dentro de los <strong>14 días</strong> posteriores a la entrega del artículo."
 ],
 "Condition of Returned Items": [
  "État des articles retournés",
  "Condizioni degli articoli resi",
  "Zustand zurückgesendeter Artikel",
  "Estado de los artículos devueltos"
 ],
 "Items must be returned in the same condition as they were received.": [
  "Les articles doivent être retournés dans l'état dans lequel ils ont été reçus.",
  "Gli articoli devono essere restituiti nelle stesse condizioni in cui sono stati ricevuti.",
  "Artikel müssen in demselben Zustand zurückgesendet werden, in dem sie empfangen wurden.",
  "Los artículos deben devolverse en el mismo estado en que se recibieron."
 ],
 "Because our posters are authentic vintage collectibles, minor signs of age, wear, folds, or restoration may be present and are described in the listing.": [
  "Nos affiches étant de véritables objets de collection vintage, de légers signes d'âge, d'usure, de pliures ou de restauration peuvent être présents et sont décrits dans l'annonce.",
  "Poiché i nostri poster sono autentici pezzi da collezione vintage, possono essere presenti lievi segni di età, usura, pieghe o restauri, descritti nell'inserzione.",
  "Da unsere Plakate authentische Vintage-Sammlerstücke sind, können leichte Alters-, Gebrauchs-, Falt- oder Restaurierungsspuren vorhanden sein, die in der Beschreibung angegeben sind.",
  "Como nuestros carteles son coleccionables vintage auténticos, pueden presentar leves signos de edad, desgaste, pliegues o restauración, que se describen en la ficha del producto."
 ],
 "Return Shipping": [
  "Frais d'expédition du retour",
  "Spedizione del reso",
  "Rücksendekosten",
  "Envío de la devolución"
 ],
 "Return shipping costs are the responsibility of the buyer unless the item was incorrectly described or damaged during shipping.": [
  "Les frais d'expédition du retour sont à la charge de l'acheteur, sauf si l'article a été mal décrit ou endommagé pendant le transport.",
  "Le spese di spedizione del reso sono a carico dell'acquirente, a meno che l'articolo non sia stato descritto in modo errato o danneggiato durante la spedizione.",
  "Die Rücksendekosten trägt der Käufer, es sei denn, der Artikel wurde falsch beschrieben oder beim Versand beschädigt.",
  "Los gastos de envío de la devolución corren a cargo del comprador, salvo que el artículo se haya descrito incorrectamente o se haya dañado durante el transporte."
 ],
 "Refunds": [
  "Remboursements",
  "Rimborsi",
  "Erstattungen",
  "Reembolsos"
 ],
 "Refunds are issued after the returned item has been received and inspected.": [
  "Les remboursements sont effectués après réception et vérification de l'article retourné.",
  "I rimborsi vengono effettuati dopo che l'articolo restituito è stato ricevuto e controllato.",
  "Erstattungen erfolgen, nachdem der zurückgesendete Artikel eingegangen ist und geprüft wurde.",
  "Los reembolsos se emiten una vez recibido e inspeccionado el artículo devuelto."
 ],
 "We respect your privacy and are committed to protecting your personal information.": [
  "Nous respectons votre vie privée et nous nous engageons à protéger vos informations personnelles.",
  "Rispettiamo la tua privacy e ci impegniamo a proteggere le tue informazioni personali.",
  "Wir respektieren Ihre Privatsphäre und verpflichten uns, Ihre persönlichen Daten zu schützen.",
  "Respetamos tu privacidad y nos comprometemos a proteger tu información personal."
 ],
 "Information We Collect": [
  "Informations que nous collectons",
  "Informazioni che raccogliamo",
  "Welche Daten wir erheben",
  "Información que recopilamos"
 ],
 "When placing an order we may collect the following information:": [
  "Lors d'une commande, nous pouvons collecter les informations suivantes :",
  "Quando effettui un ordine, possiamo raccogliere le seguenti informazioni:",
  "Bei einer Bestellung können wir folgende Daten erheben:",
  "Al realizar un pedido, podemos recopilar la siguiente información:"
 ],
 "Email address": [
  "Adresse e-mail",
  "Indirizzo e-mail",
  "E-Mail-Adresse",
  "Dirección de correo electrónico"
 ],
 "Shipping address": [
  "Adresse de livraison",
  "Indirizzo di spedizione",
  "Lieferadresse",
  "Dirección de envío"
 ],
 "Payments": [
  "Paiements",
  "Pagamenti",
  "Zahlungen",
  "Pagos"
 ],
 "Payments are processed securely through <strong>Stripe</strong>. We do not store or have access to credit card details.": [
  "Les paiements sont traités de manière sécurisée par <strong>Stripe</strong>. Nous ne stockons pas les données de carte bancaire et n'y avons pas accès.",
  "I pagamenti vengono elaborati in modo sicuro tramite <strong>Stripe</strong>. Non conserviamo né abbiamo accesso ai dati della carta di credito.",
  "Zahlungen werden sicher über <strong>Stripe</strong> abgewickelt. Wir speichern keine Kreditkartendaten und haben keinen Zugriff darauf.",
  "Los pagos se procesan de forma segura a través de <strong>Stripe</strong>. No almacenamos los datos de tu tarjeta de crédito ni tenemos acceso a ellos."
 ],
 "Use of Information": [
  "Utilisation des informations",
  "Utilizzo delle informazioni",
  "Verwendung der Daten",
  "Uso de la información"
 ],
 "Your information is used only for order fulfillment, shipping, and customer service.": [
  "Vos informations sont utilisées uniquement pour le traitement des commandes, la livraison et le service client.",
  "Le tue informazioni vengono utilizzate solo per l'evasione degli ordini, la spedizione e il servizio clienti.",
  "Ihre Daten werden ausschließlich für die Auftragsabwicklung, den Versand und den Kundenservice verwendet.",
  "Tu información se utiliza únicamente para la gestión de pedidos, el envío y la atención al cliente."
 ],
 "We do not sell, rent, or share your personal data with third parties except when required to process your order or comply with legal obligations.": [
  "Nous ne vendons, ne louons ni ne partageons vos données personnelles avec des tiers, sauf si cela est nécessaire pour traiter votre commande ou respecter des obligations légales.",
  "Non vendiamo, affittiamo né condividiamo i tuoi dati personali con terze parti, salvo quando necessario per elaborare il tuo ordine o adempiere a obblighi di legge.",
  "Wir verkaufen, vermieten oder teilen Ihre personenbezogenen Daten nicht mit Dritten, es sei denn, dies ist zur Abwicklung Ihrer Bestellung oder zur Erfüllung gesetzlicher Pflichten erforderlich.",
  "No vendemos, alquilamos ni compartimos tus datos personales con terceros, salvo cuando sea necesario para tramitar tu pedido o cumplir obligaciones legales."
 ],
 "Terms & Conditions": [
  "Conditions générales",
  "Termini e condizioni",
  "Allgemeine Geschäftsbedingungen",
  "Términos y condiciones"
 ],
 "By using this website you agree to the following terms and conditions.": [
  "En utilisant ce site, vous acceptez les conditions générales suivantes.",
  "Utilizzando questo sito accetti i seguenti termini e condizioni.",
  "Durch die Nutzung dieser Website erklären Sie sich mit den folgenden Geschäftsbedingungen einverstanden.",
  "Al utilizar este sitio web, aceptas los siguientes términos y condiciones."
 ],
 "Product Information": [
  "Informations sur les produits",
  "Informazioni sui prodotti",
  "Produktinformationen",
  "Información del producto"
 ],
 "All posters sold on this website are authentic vintage items unless otherwise stated.": [
  "Toutes les affiches vendues sur ce site sont de véritables articles vintage, sauf indication contraire.",
  "Tutti i poster venduti su questo sito sono autentici articoli vintage, salvo diversa indicazione.",
  "Alle auf dieser Website verkauften Plakate sind authentische Vintage-Artikel, sofern nicht anders angegeben.",
  "Todos los carteles vendidos en este sitio web son artículos vintage auténticos, salvo que se indique lo contrario."
 ],
 "Descriptions, condition grades, and images are provided honestly based on professional assessment.": [
  "Les descriptions, les grades d'état et les images sont fournis en toute honnêteté sur la base d'une expertise professionnelle.",
  "Descrizioni, gradi di condizione e immagini sono forniti con onestà sulla base di una valutazione professionale.",
  "Beschreibungen, Zustandsbewertungen und Bilder werden ehrlich und auf Grundlage einer fachkundigen Einschätzung bereitgestellt.",
  "Las descripciones, los grados de estado y las imágenes se proporcionan con honestidad, a partir de una valoración profesional."
 ],
 "Pricing": [
  "Tarifs",
  "Prezzi",
  "Preise",
  "Precios"
 ],
 "Prices may change without notice.": [
  "Les prix peuvent changer sans préavis.",
  "I prezzi possono cambiare senza preavviso.",
  "Preisänderungen ohne Vorankündigung vorbehalten.",
  "Los precios pueden cambiar sin previo aviso."
 ],
 "Payments are processed securely through Stripe.": [
  "Les paiements sont traités de manière sécurisée via Stripe.",
  "I pagamenti vengono elaborati in modo sicuro tramite Stripe.",
  "Zahlungen werden sicher über Stripe abgewickelt.",
  "Los pagos se procesan de forma segura a través de Stripe."
 ],
 "The seller is not responsible for delays caused by postal services or customs procedures.": [
  "Le vendeur n'est pas responsable des retards causés par les services postaux ou les procédures douanières.",
  "Il venditore non è responsabile per i ritardi causati dai servizi postali o dalle procedure doganali.",
  "Der Verkäufer haftet nicht für Verzögerungen durch Postdienste oder Zollverfahren.",
  "El vendedor no se responsabiliza de los retrasos causados por los servicios postales o los trámites aduaneros."
 ],
 "By placing an order you agree to the shipping and return policies stated on this website.": [
  "En passant commande, vous acceptez les politiques de livraison et de retour indiquées sur ce site.",
  "Effettuando un ordine accetti le politiche di spedizione e di reso indicate su questo sito.",
  "Mit Ihrer Bestellung erkennen Sie die auf dieser Website angegebenen Versand- und Rückgabebedingungen an.",
  "Al realizar un pedido, aceptas las políticas de envío y devolución indicadas en este sitio web."
 ],
 "Thank you — your order is confirmed ✅": [
  "Merci — votre commande est confirmée ✅",
  "Grazie — il tuo ordine è confermato ✅",
  "Vielen Dank — Ihre Bestellung ist bestätigt ✅",
  "Gracias: tu pedido está confirmado ✅"
 ],
 "Your payment was successful. We will prepare your order and send confirmation details shortly.": [
  "Votre paiement a bien été effectué. Nous allons préparer votre commande et vous envoyer les détails de confirmation sous peu.",
  "Il pagamento è andato a buon fine. Prepareremo il tuo ordine e ti invieremo a breve i dettagli di conferma.",
  "Ihre Zahlung war erfolgreich. Wir bereiten Ihre Bestellung vor und senden Ihnen in Kürze die Bestätigungsdetails.",
  "El pago se ha realizado correctamente. Prepararemos tu pedido y te enviaremos los detalles de confirmación en breve."
 ],
 "Loading order details...": [
  "Chargement des détails de la commande...",
  "Caricamento dei dettagli dell'ordine...",
  "Bestelldetails werden geladen...",
  "Cargando los detalles del pedido..."
 ],
 "Back to gallery": [
  "Retour à la galerie",
  "Torna alla galleria",
  "Zurück zur Galerie",
  "Volver a la galería"
 ],
 "Added to cart": [
  "Ajouté au panier",
  "Aggiunto al carrello",
  "Zum Warenkorb hinzugefügt",
  "Añadido al carrito"
 ],
 "View cart": [
  "Voir le panier",
  "Vai al carrello",
  "Warenkorb ansehen",
  "Ver carrito"
 ],
 "I always combine shipping for saving postage expenses": [
  "Je regroupe toujours les envois pour réduire les frais de port.",
  "Combino sempre le spedizioni per risparmiare sulle spese postali.",
  "Ich fasse Sendungen immer zusammen, um Portokosten zu sparen.",
  "Siempre combino los envíos para ahorrar en gastos de franqueo"
 ],
 "Search posters...": [
  "Rechercher des affiches...",
  "Cerca poster...",
  "Plakate suchen...",
  "Buscar carteles..."
 ],
 "First and last name": [
  "Prénom et nom",
  "Nome e cognome",
  "Vor- und Nachname",
  "Nombre y apellidos"
 ],
 "Street, building, apartment": [
  "Rue, bâtiment, appartement",
  "Via, numero civico, interno",
  "Straße, Hausnummer, Wohnung",
  "Calle, edificio, piso"
 ],
 "City": [
  "Ville",
  "Città",
  "Stadt",
  "Ciudad"
 ],
 "Region or State": [
  "Région ou État",
  "Regione o Stato",
  "Region oder Bundesland",
  "Región o provincia"
 ],
 "ZIP or postal code": [
  "Code postal",
  "CAP",
  "Postleitzahl",
  "Código postal"
 ],
 "Buy it now": [
  "Acheter maintenant",
  "Acquista ora",
  "Jetzt kaufen",
  "Comprar ahora"
 ],
 "We indicate the minimum shipping cost so that your customs duties are minimal": [
  "Nous indiquons le coût d'expédition minimal afin que vos droits de douane soient réduits au minimum",
  "Indichiamo il costo di spedizione minimo affinché i tuoi dazi doganali siano ridotti al minimo",
  "Wir geben die minimalen Versandkosten an, damit Ihre Zollgebühren möglichst gering ausfallen",
  "Indicamos el coste de envío mínimo para que tus aranceles de aduana sean los menores posibles"
 ],
 "Shipping:": [
  "Frais de port :",
  "Spedizione:",
  "Versand:",
  "Envío:"
 ],
 "Free worldwide shipping": [
  "Livraison gratuite dans le monde entier",
  "Spedizione gratuita in tutto il mondo",
  "Kostenloser weltweiter Versand",
  "Envío gratuito a todo el mundo"
 ],
 "Located in:": [
  "Situé en :",
  "Ubicazione:",
  "Standort:",
  "Ubicación:"
 ],
 "Ukraine": [
  "Ukraine",
  "Ucraina",
  "Ukraine",
  "Ucrania"
 ],
 "Delivery:": [
  "Délai de livraison :",
  "Consegna:",
  "Lieferung:",
  "Entrega:"
 ],
 "Returns:": [
  "Retours :",
  "Resi:",
  "Rückgabe:",
  "Devoluciones:"
 ],
 "14 days returns (buyer pays shipping)": [
  "Retours sous 14 jours (frais de retour à la charge de l'acheteur)",
  "Reso entro 14 giorni (spese di spedizione a carico dell'acquirente)",
  "14 Tage Rückgaberecht (Versandkosten trägt der Käufer)",
  "Devoluciones en 14 días (el comprador paga el envío)"
 ],
 "Payments: Visa / Mastercard / Stripe": [
  "Paiements : Visa / Mastercard / Stripe",
  "Pagamenti: Visa / Mastercard / Stripe",
  "Zahlung: Visa / Mastercard / Stripe",
  "Pagos: Visa / Mastercard / Stripe"
 ],
 "Similar posters": [
  "Affiches similaires",
  "Poster simili",
  "Ähnliche Plakate",
  "Carteles similares"
 ],
 "Description": [
  "Description",
  "Descrizione",
  "Beschreibung",
  "Descripción"
 ],
 "No description available.": [
  "Aucune description disponible.",
  "Nessuna descrizione disponibile.",
  "Keine Beschreibung verfügbar.",
  "Descripción no disponible."
 ],
 "Unknown": [
  "Inconnu",
  "Sconosciuto",
  "Unbekannt",
  "Desconocido"
 ],
 "N/A": [
  "N/D",
  "N/D",
  "k. A.",
  "N/D"
 ],
 "No results found": [
  "Aucun résultat",
  "Nessun risultato",
  "Keine Ergebnisse",
  "No se encontraron resultados"
 ],
 "Remove": [
  "Supprimer",
  "Rimuovi",
  "Entfernen",
  "Eliminar"
 ],
 "Your cart is empty — add at least one item.": [
  "Votre panier est vide — ajoutez au moins un article.",
  "Il tuo carrello è vuoto — aggiungi almeno un articolo.",
  "Ihr Warenkorb ist leer — fügen Sie mindestens einen Artikel hinzu.",
  "Tu carrito está vacío: añade al menos un artículo."
 ],
 "Error sending shipping form.": [
  "Erreur lors de l'envoi du formulaire de livraison.",
  "Errore durante l'invio del modulo di spedizione.",
  "Fehler beim Senden des Versandformulars.",
  "Error al enviar el formulario de envío."
 ],
 "Stripe session error": [
  "Erreur de session Stripe",
  "Errore della sessione Stripe",
  "Stripe-Sitzungsfehler",
  "Error de sesión de Stripe"
 ],
 "Stripe failed to load.": [
  "Impossible de charger Stripe.",
  "Impossibile caricare Stripe.",
  "Stripe konnte nicht geladen werden.",
  "No se pudo cargar Stripe."
 ],
 "Payment redirect failed. Please try again.": [
  "La redirection vers le paiement a échoué. Veuillez réessayer.",
  "Il reindirizzamento al pagamento non è riuscito. Riprova.",
  "Die Weiterleitung zur Zahlung ist fehlgeschlagen. Bitte versuchen Sie es erneut.",
  "Falló la redirección al pago. Inténtalo de nuevo."
 ],
 "We could not verify your order session.": [
  "Nous n'avons pas pu vérifier votre session de commande.",
  "Non siamo riusciti a verificare la sessione del tuo ordine.",
  "Wir konnten Ihre Bestellsitzung nicht überprüfen.",
  "No pudimos verificar la sesión de tu pedido."
 ],
 "We could not load your order details.": [
  "Nous n'avons pas pu charger les détails de votre commande.",
  "Non siamo riusciti a caricare i dettagli del tuo ordine.",
  "Wir konnten Ihre Bestelldetails nicht laden.",
  "No pudimos cargar los detalles de tu pedido."
 ],
 "Network error while loading your order details.": [
  "Erreur réseau lors du chargement des détails de votre commande.",
  "Errore di rete durante il caricamento dei dettagli dell'ordine.",
  "Netzwerkfehler beim Laden Ihrer Bestelldetails.",
  "Error de red al cargar los detalles de tu pedido."
 ],
 "Please contact us via <a href=\"contact.html\" class=\"underline text-blue-400\">Contact &amp; Help</a>.": [
  "Veuillez nous contacter via <a href=\"contact.html\" class=\"underline text-blue-400\">Contact &amp; Aide</a>.",
  "Contattaci tramite <a href=\"contact.html\" class=\"underline text-blue-400\">Contatti e Assistenza</a>.",
  "Bitte kontaktieren Sie uns über <a href=\"contact.html\" class=\"underline text-blue-400\">Kontakt &amp; Hilfe</a>.",
  "Ponte en contacto con nosotros a través de <a href=\"contact.html\" class=\"underline text-blue-400\">Contacto y Ayuda</a>."
 ],
 "Order summary": [
  "Récapitulatif de la commande",
  "Riepilogo dell'ordine",
  "Bestellübersicht",
  "Resumen del pedido"
 ],
 "No items found.": [
  "Aucun article trouvé.",
  "Nessun articolo trovato.",
  "Keine Artikel gefunden.",
  "No se encontraron artículos."
 ],
 "If you have any questions about your order, please contact us through the Contact & Help page.": [
  "Pour toute question concernant votre commande, contactez-nous via la page Contact & Aide.",
  "Per qualsiasi domanda sul tuo ordine, contattaci tramite la pagina Contatti e Assistenza.",
  "Bei Fragen zu Ihrer Bestellung kontaktieren Sie uns bitte über die Seite Kontakt & Hilfe.",
  "Si tienes alguna pregunta sobre tu pedido, ponte en contacto con nosotros a través de la página Contacto y Ayuda."
 ],
 "Vintage Posters Shop | Original Vintage Posters": [
  "Boutique d'affiches vintage | Affiches vintage originales",
  "Negozio di poster vintage | Manifesti d'epoca originali",
  "Vintage-Poster Shop | Original Vintage Plakate",
  "Vintage Posters Shop | Carteles vintage originales"
 ],
 "Discover Posters — a curated collection of high-quality art posters by talented artists worldwide. Elegant designs, premium materials, and free worldwide shipping.": [
  "Découvrez Posters — une collection d'affiches d'art de haute qualité signées d'artistes du monde entier. Designs élégants, matériaux premium et livraison gratuite dans le monde entier.",
  "Scopri Posters — una collezione curata di poster d'arte di alta qualità di artisti di tutto il mondo. Design eleganti, materiali pregiati e spedizione gratuita in tutto il mondo.",
  "Entdecken Sie Posters — eine kuratierte Sammlung hochwertiger Kunstplakate talentierter Künstler aus aller Welt. Elegante Designs, Premium-Materialien und kostenloser weltweiter Versand.",
  "Descubre Posters: una colección seleccionada de carteles artísticos de alta calidad de artistas de talento de todo el mundo. Diseños elegantes, materiales premium y envío gratuito a todo el mundo."
 ],
 "Posters — Vintage Posters | Leonetto Cappiello | Belle Affiche Shop": [
  "Posters — Affiches vintage | Leonetto Cappiello | Boutique Belle Affiche",
  "Posters — Poster vintage | Leonetto Cappiello | Negozio di manifesti d'epoca",
  "Posters — Vintage Plakate | Leonetto Cappiello | Plakat-Shop",
  "Posters — Carteles vintage | Leonetto Cappiello | Belle Affiche Shop"
 ],
 "Discover high-quality art prints with unique designs by famous and emerging artists. Free worldwide shipping.": [
  "Découvrez des tirages d'art de haute qualité aux designs uniques signés d'artistes célèbres et émergents. Livraison gratuite dans le monde entier.",
  "Scopri stampe d'arte di alta qualità con design unici di artisti famosi ed emergenti. Spedizione gratuita in tutto il mondo.",
  "Entdecken Sie hochwertige Kunstdrucke mit einzigartigen Designs von bekannten und aufstrebenden Künstlern. Kostenloser weltweiter Versand.",
  "Descubre láminas artísticas de alta calidad con diseños únicos de artistas famosos y emergentes. Envío gratuito a todo el mundo."
 ],
 "Authenticity Guarantee — Original Vintage Posters | Posters": [
  "Garantie d'authenticité — Affiches vintage originales | Posters",
  "Garanzia di autenticità — Poster vintage originali | Posters",
  "Echtheitsgarantie — Original Vintage-Plakate | Posters",
  "Garantía de autenticidad — Carteles vintage originales | Posters"
 ],
 "We sell only authentic original vintage posters with a signed Certificate of Authenticity. Learn about our verification process, condition grading, and classic printing techniques.": [
  "Nous ne vendons que des affiches vintage originales et authentiques, accompagnées d'un certificat d'authenticité signé. Découvrez notre processus de vérification, notre système de notation de l'état et les techniques d'impression classiques.",
  "Vendiamo solo poster vintage originali e autentici con certificato di autenticità firmato. Scopri il nostro processo di verifica, la classificazione delle condizioni e le tecniche di stampa classiche.",
  "Wir verkaufen ausschließlich authentische originale Vintage-Plakate mit signiertem Echtheitszertifikat. Erfahren Sie mehr über unser Prüfverfahren, die Zustandsbewertung und klassische Drucktechniken.",
  "Vendemos únicamente carteles vintage originales auténticos con un Certificado de Autenticidad firmado. Conoce nuestro proceso de verificación, la clasificación del estado y las técnicas clásicas de impresión."
 ],
 "We offer only authentic original vintage posters with a signed Certificate of Authenticity.": [
  "Nous proposons uniquement des affiches vintage originales authentiques avec certificat d'authenticité signé.",
  "Offriamo solo poster vintage originali autentici con certificato di autenticità firmato.",
  "Wir bieten ausschließlich authentische originale Vintage-Plakate mit signiertem Echtheitszertifikat an.",
  "Ofrecemos únicamente carteles vintage originales auténticos con un Certificado de Autenticidad firmado."
 ],
 "Contact - Posters": [
  "Contact - Posters",
  "Contatti - Posters",
  "Kontakt - Posters",
  "Contacto - Posters"
 ],
 "Shipping Information - Posters": [
  "Informations de livraison - Posters",
  "Informazioni di spedizione - Posters",
  "Versandinformationen - Posters",
  "Información de envío - Posters"
 ],
 "Returns & Refund Policy - Posters": [
  "Politique de retour et de remboursement - Posters",
  "Politica di reso e rimborso - Posters",
  "Rückgabe- und Erstattungsbedingungen - Posters",
  "Política de devoluciones y reembolsos - Posters"
 ],
 "Privacy Policy - Posters": [
  "Politique de confidentialité - Posters",
  "Informativa sulla privacy - Posters",
  "Datenschutzerklärung - Posters",
  "Política de privacidad - Posters"
 ],
 "Terms & Conditions - Posters": [
  "Conditions générales - Posters",
  "Termini e condizioni - Posters",
  "Allgemeine Geschäftsbedingungen - Posters",
  "Términos y condiciones - Posters"
 ],
 "Order confirmed | Vintage Posters Shop": [
  "Commande confirmée | Boutique d'affiches vintage",
  "Ordine confermato | Negozio di poster vintage",
  "Bestellung bestätigt | Vintage-Poster Shop",
  "Pedido confirmado | Vintage Posters Shop"
 ],
 "Your order has been successfully confirmed. Thank you for shopping at Vintage Posters Shop.": [
  "Votre commande a bien été confirmée. Merci d'avoir acheté sur Vintage Posters Shop.",
  "Il tuo ordine è stato confermato con successo. Grazie per aver acquistato su Vintage Posters Shop.",
  "Ihre Bestellung wurde erfolgreich bestätigt. Vielen Dank für Ihren Einkauf bei Vintage Posters Shop.",
  "Tu pedido se ha confirmado correctamente. Gracias por comprar en Vintage Posters Shop."
 ]
};

  // Extra phrases (poster descriptions) generated by translate_descriptions.py -> i18n_descriptions.js
  // (window.SITE_I18N_EXTRA = { "English line": [fr, it, de, es] }). Hand-written entries above win.
  if (window.SITE_I18N_EXTRA) {
    for (const k in window.SITE_I18N_EXTRA) {
      if (!Object.prototype.hasOwnProperty.call(T, k)) T[k] = window.SITE_I18N_EXTRA[k];
    }
  }

  // Whole-string patterns with $1 $2 placeholders: [regex, [fr, it, de, es]]
  const P = [
    [/^Total:\s*(.*)$/, ['Total : $1', 'Totale: $1', 'Gesamt: $1', 'Total: $1']],
    [/^Total paid:\s*(.*)$/, ['Total payé : $1', 'Totale pagato: $1', 'Gesamtbetrag: $1', 'Total pagado: $1']],
    [/^Size:\s*(.*)$/, ['Taille : $1', 'Dimensioni: $1', 'Größe: $1', 'Tamaño: $1']],
    [/^Artist:\s*(.*)$/, ['Artiste : $1', 'Artista: $1', 'Künstler: $1', 'Artista: $1']],
    [/^Quantity:\s*(.*)$/, ['Quantité : $1', 'Quantità: $1', 'Menge: $1', 'Cantidad: $1']],
    [/^Proceed to Payment\s*[—-]\s*(.*)$/, ['Passer au paiement — $1', 'Procedi al pagamento — $1', 'Weiter zur Zahlung — $1', 'Proceder al pago — $1']],
    [/^Estimated (\d+)\s*[–-]\s*(\d+) business days$/, ['Estimé : $1 à $2 jours ouvrables', 'Stimati $1–$2 giorni lavorativi', 'Voraussichtlich $1–$2 Werktage', 'Estimado: $1–$2 días hábiles']],
    [/^Order for <strong>(.*)<\/strong>$/, ['Commande de <strong>$1</strong>', 'Ordine di <strong>$1</strong>', 'Bestellung für <strong>$1</strong>', 'Pedido de <strong>$1</strong>']],
    [/^Shipping takes (\d+)\s*[–-]\s*(\d+) business days to USA, Canada, Australia and Japan\.?$/, [
      "La livraison prend $1 à $2 jours ouvrables vers les États-Unis, le Canada, l'Australie et le Japon.",
      'La spedizione richiede $1–$2 giorni lavorativi per USA, Canada, Australia e Giappone.',
      'Der Versand dauert $1–$2 Werktage in die USA, nach Kanada, Australien und Japan.', 'El envío tarda de $1 a $2 días hábiles a EE. UU., Canadá, Australia y Japón.']],
    [/^Shipping to Europe takes (\d+)\s*[–-]\s*(\d+) business days\.?$/, [
      'La livraison en Europe prend $1 à $2 jours ouvrables.',
      'La spedizione in Europa richiede $1–$2 giorni lavorativi.',
      'Der Versand nach Europa dauert $1–$2 Werktage.', 'El envío a Europa tarda de $1 a $2 días hábiles.']],
    // poster size line: "90 x 135 cm | 35.43 × 53.15 inches"
    [/^(.{1,30}cm\s*\|.{1,30}?)\s*inches$/, ['$1 pouces', '$1 pollici', '$1 Zoll', '$1 pulgadas']]
  ];
  // Substring patterns (keep emoji etc.): [regex, [fr, it, de]]
  const S = [
    [/Hover to zoom/, ['Survolez pour zoomer', 'Passa il mouse per ingrandire', 'Zum Zoomen mit der Maus darüberfahren', 'Pasa el cursor para ampliar']],
    [/Shipping info sent successfully!/, ['Informations de livraison envoyées avec succès !', 'Dati di spedizione inviati con successo!', 'Versandinformationen erfolgreich gesendet!', '¡Información de envío enviada con éxito!']]
  ];

  const norm = s => s.replace(/\s+/g, ' ').trim();
  const idx = lang => LANGS.indexOf(lang) - 1;

  function translateTrimmed(key, i) {
    if (Object.prototype.hasOwnProperty.call(T, key)) return T[key][i];
    for (const [re, tpl] of P) { if (re.test(key)) return key.replace(re, tpl[i]); }
    for (const [re, tpl] of S) { if (re.test(key)) return key.replace(re, tpl[i]); }
    return null;
  }

  // new full text for a raw string, or null when there is nothing to translate
  function translateRaw(raw, lang) {
    if (lang === 'en' || !raw) return null;
    const i = idx(lang);
    const key = norm(raw);
    if (!key) return null;
    const direct = translateTrimmed(key, i);
    if (direct !== null) {
      let lead = raw.match(/^\s*/)[0];
      const trail = raw.match(/\s*$/)[0];
      if (/^[.,;:!?)]/.test(direct)) lead = '';
      return lead + direct + trail;
    }
    if (raw.indexOf('\n') !== -1) { // multi-line blocks: translate known lines, keep the rest
      const lines = raw.split('\n');
      let found = 0;
      const out = lines.map(l => {
        const t = l.trim();
        if (!t) return l;
        const tr = translateTrimmed(norm(t), i);
        if (tr === null) return l;
        found++;
        return l.replace(t, () => tr);
      });
      if (found) return out.join('\n');
    }
    return null;
  }

  let lang = 'en', obs = null;
  const textRec = new WeakMap();  // text node -> {o: original, t: last value we set}
  const attrRec = new WeakMap();  // element -> {attr: {o, t}}
  const blkRec = new WeakMap();   // element -> {o: original innerHTML, t: last innerHTML we set}
  const ATTRS = ['placeholder', 'title', 'aria-label'];
  const SKIP = new Set(['SCRIPT', 'STYLE', 'TEXTAREA', 'NOSCRIPT', 'CODE', 'PRE']);
  const INLINE = new Set(['STRONG', 'EM', 'B', 'I', 'SPAN', 'BR', 'CODE', 'SMALL', 'A']);
  const INLINE_NOT_BLOCK = new Set(['STRONG', 'EM', 'B', 'I', 'SPAN', 'BR', 'CODE', 'SMALL']);

  // a "block" = element whose children are only inline tags and which has its own text,
  // e.g. <p>Pay with <strong>Stripe</strong> ...</p>. Translated as one unit (word order!)
  function isLeafBlock(el) {
    if (!el.children.length || INLINE_NOT_BLOCK.has(el.tagName) || SKIP.has(el.tagName)) return false;
    const all = el.querySelectorAll('*');
    for (let k = 0; k < all.length; k++) if (!INLINE.has(all[k].tagName)) return false;
    for (let c = el.firstChild; c; c = c.nextSibling) if (c.nodeType === 3 && c.nodeValue.trim()) return true;
    return false;
  }

  function applyBlock(el) {
    if (el.closest('[data-no-i18n]') || !isLeafBlock(el)) return;
    const cur = el.innerHTML;
    const rec = blkRec.get(el);
    const original = rec && cur === rec.t ? rec.o : cur;
    const tr = lang === 'en' ? null : translateTrimmed(norm(original), idx(lang));
    if (tr !== null) {
      if (tr !== cur) el.innerHTML = tr;
      el.setAttribute('data-i18n-blk', '');
      blkRec.set(el, { o: original, t: el.innerHTML });
    } else if (rec) {
      if (original !== cur) el.innerHTML = original;
      el.removeAttribute('data-i18n-blk');
      blkRec.delete(el);
    }
  }

  function applyText(node) {
    const p = node.parentNode;
    if (!p || SKIP.has(p.nodeName) || (p.closest && p.closest('[data-no-i18n],[data-i18n-blk]'))) return;
    const cur = node.nodeValue;
    let rec = textRec.get(node);
    if (!rec || cur !== rec.t) rec = { o: cur, t: cur };
    const tr = translateRaw(rec.o, lang);
    const val = tr !== null ? tr : rec.o;
    if (val !== cur) node.nodeValue = val;
    rec.t = val;
    textRec.set(node, rec);
  }

  function applyAttrs(el) {
    if (el.closest && el.closest('[data-no-i18n]')) return;
    let rec = attrRec.get(el);
    for (const a of ATTRS) {
      if (!el.hasAttribute(a)) continue;
      if (!rec) { rec = {}; attrRec.set(el, rec); }
      const cur = el.getAttribute(a);
      let r = rec[a];
      if (!r || cur !== r.t) r = { o: cur, t: cur };
      const tr = translateRaw(r.o, lang);
      const val = tr !== null ? tr.trim() : r.o;
      if (val !== cur) el.setAttribute(a, val);
      r.t = val; rec[a] = r;
    }
  }

  function applyTree(root) {
    if (root.nodeType === 3) return applyText(root);
    if (root.nodeType !== 1 || SKIP.has(root.nodeName)) return;
    applyBlock(root);
    root.querySelectorAll('*').forEach(applyBlock);
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let n; while ((n = w.nextNode())) applyText(n);
    applyAttrs(root);
    root.querySelectorAll('[placeholder],[title],[aria-label]').forEach(applyAttrs);
  }

  const metaRec = new Map();
  function applyHead() {
    const items = [
      [document.querySelector('title'), null],
      [document.querySelector('meta[name="description"]'), 'content'],
      [document.querySelector('meta[property="og:title"]'), 'content'],
      [document.querySelector('meta[property="og:description"]'), 'content']
    ];
    for (const [el, attr] of items) {
      if (!el) continue;
      const cur = attr ? el.getAttribute(attr) : el.textContent;
      let r = metaRec.get(el);
      if (!r || cur !== r.t) r = { o: cur, t: cur };
      const tr = translateRaw(r.o, lang);
      const val = tr !== null ? tr.trim() : r.o;
      if (attr) el.setAttribute(attr, val); else document.title = val;
      r.t = val; metaRec.set(el, r);
    }
  }

  function observe() {
    if (!obs) {
      let queue = new Set(), scheduled = false;
      obs = new MutationObserver(muts => {
        for (const m of muts) {
          if (m.type === 'childList') m.addedNodes.forEach(n => queue.add(n));
          else queue.add(m.target);
        }
        if (scheduled) return;
        scheduled = true;
        requestAnimationFrame(() => {
          scheduled = false;
          const items = Array.from(queue); queue = new Set();
          run(() => items.forEach(n => {
            if (!document.body.contains(n)) return;
            if (n.nodeType === 3) applyText(n); else applyTree(n);
          }));
        });
      });
    }
    obs.observe(document.body, { childList: true, subtree: true, characterData: true,
      attributes: true, attributeFilter: ATTRS });
  }
  function run(fn) { if (obs) obs.disconnect(); try { fn(); } finally { observe(); } }

  function buildSwitcher() {
    if (document.getElementById('lang-switcher')) return;
    const box = document.createElement('div');
    box.id = 'lang-switcher';
    box.setAttribute('data-no-i18n', '');
    box.style.cssText = 'white-space:nowrap;flex-shrink:0';
    const sel = document.createElement('select');
    sel.setAttribute('aria-label', 'Language');
    sel.style.cssText = 'background:#1f2937;color:#fff;border:1px solid #4b5563;border-radius:6px;padding:3px 6px;font-size:14px;font-weight:600;cursor:pointer';
    LANGS.forEach(l => {
      const o = document.createElement('option');
      o.value = l; o.textContent = l.toUpperCase();
      sel.appendChild(o);
    });
    box.appendChild(sel);
    const cur = document.getElementById('currency-switcher');
    if (cur && cur.parentNode) {
      cur.parentNode.insertBefore(box, cur.nextSibling);
    } else {
      box.style.cssText += ';position:fixed;top:8px;right:8px;z-index:9999';
      document.body.appendChild(box);
    }
    sel.addEventListener('change', () => setLang(sel.value));
  }
  function markActive() {
    const sel = document.querySelector('#lang-switcher select');
    if (sel) sel.value = lang;
  }

  function setLang(l, save) {
    if (LANGS.indexOf(l) < 0) l = 'en';
    lang = l;
    if (save !== false) { try { localStorage.setItem('site_lang', l); } catch (e) {} }
    document.documentElement.lang = l;
    run(() => { applyTree(document.body); applyHead(); });
    markActive();
    document.dispatchEvent(new CustomEvent('sitelangchange', { detail: { lang: l } }));
  }

  function pickInitial() {
    const q = new URLSearchParams(location.search).get('lang');
    if (q && LANGS.indexOf(q.toLowerCase()) >= 0) return q.toLowerCase();
    try { const s = localStorage.getItem('site_lang'); if (s && LANGS.indexOf(s) >= 0) return s; } catch (e) {}
    if (AUTO_DETECT) {
      const nav = (navigator.language || 'en').slice(0, 2).toLowerCase();
      if (LANGS.indexOf(nav) >= 0) return nav;
    }
    return 'en';
  }

  function init() {
    buildSwitcher();
    setLang(pickInitial(), !!new URLSearchParams(location.search).get('lang'));
  }
  window.siteI18n = { setLang, get lang() { return lang; }, translate: raw => translateRaw(raw, lang) };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
