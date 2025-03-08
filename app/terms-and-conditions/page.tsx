import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AlgemeneVoorwaarden() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-sm font-medium text-gray-500 tracking-wide mb-6">Algemene Voorwaarden</div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <h1 className="text-[56px] leading-[1.1] mb-6">
              Onze voorwaarden voor <br />
              <span className="text-[#0063f2]">samenwerking.</span>
            </h1>
            <p className="text-xl text-gray-600 font-light mt-4 lg:mt-8">
              Deze voorwaarden beschrijven de afspraken tussen Voicelabs en onze klanten voor het gebruik van onze AI-telefoniediensten.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-24 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg">
            <p className="text-xl text-gray-600 font-light mb-12">
              Deze voorwaarden regelen het gebruik van de AI-telefoniediensten van Voicelabs, ontworpen voor zakelijke communicatie. De Diensten omvatten AI-gestuurde interacties en gespreksafhandeling.
            </p>

            <h2 className="text-2xl font-semibold mb-6">1. Jouw Acceptatie</h2>
            <p className="text-xl text-gray-600 font-light mb-12">
              Deze Overeenkomst tussen Voicelabs ("Bedrijf") en de gebruiker ("Klant") regelt het gebruik van de Diensten. Door acceptatie van deze voorwaarden wordt de persoon of entiteit gebonden aan deze Overeenkomst, hierna "Klant" genoemd. Je bevestigt dat je meerderjarig bent en bevoegd bent om deze Overeenkomst aan te gaan. Het Bedrijf kan de Diensten (waaronder abonnement, prijzen, functionaliteit, features, prestaties, gebruikersinterface en bruikbaarheid) en deze Overeenkomst naar behoefte aanpassen. Wijzigingen worden online geplaatst en zijn direct van kracht. De algemene voorwaarden vermelden altijd een laatste update datum. Toegang tot of gebruik van de Diensten betekent acceptatie van de huidige voorwaarden.
            </p>

            <h2 className="text-2xl font-semibold mb-6">2. Beperkingen & Verantwoordelijkheden</h2>
            <p className="text-xl text-gray-600 font-light mb-12">
              De Klant stemt ermee in de Diensten te gebruiken in overeenstemming met deze Overeenkomst, het beleid van het Bedrijf en toepasselijke wetgeving. Verboden handelingen zijn onder meer reverse engineering, ongeautoriseerde toegang of wederverkoop. Klanten zijn verantwoordelijk voor het onderhouden van de benodigde toegang tot de Diensten. De klant is verantwoordelijk voor het verkrijgen en onderhouden van alle benodigde apparatuur en aanvullende diensten die nodig zijn om verbinding te maken met, toegang te krijgen tot of gebruik te maken van de Diensten. De geleverde Diensten voldoen aan alle relevante wet- en regelgeving.
            </p>

            <h2 className="text-2xl font-semibold mb-6">3. Vertrouwelijkheid & Privacy</h2>
            <p className="text-xl text-gray-600 font-light mb-12">
              Beide partijen (de "Ontvangende Partij" en de "Verstrekkende Partij") komen overeen belangrijke zakelijke, technische en/of financiële informatie te delen. Dit omvat informatie over de bedrijfsvoering van de Verstrekkende Partij of hun klanten, die vertrouwelijk is ("Bedrijfseigen Informatie"). Voor het Bedrijf omvat dit geheime details over de diensten en gebruikte software. Voor de Klant omvat dit privégegevens die aan het Bedrijf worden verstrekt voor dienstverlening ("Klantgegevens").
              <br /><br />
              De Klant behoudt alle rechten op hun Klantgegevens. Het Bedrijf kan gegevens verzamelen en analyseren met betrekking tot het gebruik van de diensten en gerelateerde technologie. Het Bedrijf kan deze gegevens gebruiken om zijn diensten te verbeteren en voor andere zakelijke doeleinden, maar alleen op een manier die specifieke klanten of hun gegevens niet identificeert.
            </p>

            <h2 className="text-2xl font-semibold mb-6">4. AVG - Verwerkersovereenkomst</h2>
            <p className="text-xl text-gray-600 font-light mb-12">
              Doel en reikwijdte van gegevensverwerking: Bij het leveren van de Diensten treedt het Bedrijf op als gegevensverwerker, die persoonsgegevens verwerkt namens de Klant, die de verwerkingsverantwoordelijke is. De aard, het doel en de duur van de verwerking, de soorten persoonsgegevens en categorieën van betrokkenen worden bepaald door de reikwijdte van de instructies van de Klant zoals gedocumenteerd in deze Overeenkomst.
              <br /><br />
              Naleving van AVG: Het Bedrijf verwerkt persoonsgegevens in overeenstemming met de Algemene Verordening Gegevensbescherming (AVG) en de instructies van de Klant. De verwerking vindt plaats voor de duur van de Overeenkomst, voor zover noodzakelijk voor het leveren van de Diensten.
            </p>

            <h2 className="text-2xl font-semibold mb-6">5. Facturering & Betalingen</h2>
            <p className="text-xl text-gray-600 font-light mb-12">
              De Klant stemt ermee in alle toepasselijke vergoedingen met betrekking tot hun account ("Vergoedingen") te betalen volgens de prijsvoorwaarden op de relevante prijspagina of zoals schriftelijk overeengekomen. Tenzij expliciet anders vermeld in deze Overeenkomst, zijn alle Vergoedingen definitief en kunnen niet worden terugbetaald, geannuleerd of gecrediteerd.
            </p>

            <h2 className="text-2xl font-semibold mb-6">6. Abonnementsduur & Verlenging</h2>
            <p className="text-xl text-gray-600 font-light mb-12">
              Je Voicelabs AI-abonnement wordt automatisch verlengd voor dezelfde duur als de initiële Abonnementstermijn, tegen de dan geldende tarieven. Als Klant heb je de mogelijkheid om je Diensten op elk moment op te zeggen door een schriftelijke kennisgeving te sturen of gebruik te maken van de opzegfunctie binnen de Diensten.
            </p>

            <h2 className="text-2xl font-semibold mb-6">7. Beëindiging</h2>
            <p className="text-xl text-gray-600 font-light mb-12">
              Deze overeenkomst begint wanneer je de Diensten voor het eerst gebruikt en blijft van kracht totdat deze wordt beëindigd volgens de bepalingen ervan. Beide partijen hebben het recht om deze overeenkomst op elk moment te beëindigen zonder boetes, mits zij 30 dagen van tevoren schriftelijk kennisgeving doen.
            </p>

            <h2 className="text-2xl font-semibold mb-6">8. Resellers</h2>
            <p className="text-xl text-gray-600 font-light mb-12">
              Reseller relatie: Het Bedrijf kan geautoriseerde resellers gebruiken voor de distributie van zijn diensten. Resellers handelen onafhankelijk en zijn geen agenten of vertegenwoordigers van het Bedrijf. De Algemene Voorwaarden tussen het Bedrijf en de eindgebruiker blijven onaangetast door eventuele afzonderlijke overeenkomsten met resellers.
            </p>

            <h2 className="text-2xl font-semibold mb-6">9. Vrijwaring, Garantiedisclaimer en Aansprakelijkheidsbeperking</h2>
            <p className="text-xl text-gray-600 font-light mb-12">
              Dienstgaranties: Het Bedrijf zet zich in om redelijke inspanningen te leveren, in lijn met de huidige beste praktijken in de sector, om ervoor te zorgen dat de Diensten met minimale verstoringen en fouten werken. Diensten worden professioneel en competent geleverd.
            </p>

            <h2 className="text-2xl font-semibold mb-6">10. Intellectueel Eigendom</h2>
            <p className="text-xl text-gray-600 font-light mb-12">
              Het Bedrijf behoudt het exclusieve eigendom van alle rechten, titels en belangen in de Diensten en Software, inclusief updates, verbeteringen of wijzigingen, evenals alle intellectuele eigendomsrechten die hierop betrekking hebben.
            </p>

            <h2 className="text-2xl font-semibold mb-6">11. Overige Bepalingen</h2>
            <p className="text-xl text-gray-600 font-light mb-12">
              Indien enig deel van deze Overeenkomst ongeldig of niet-afdwingbaar wordt geacht, zal dat deel worden beperkt tot het minimaal vereiste, zodat de rest van de Overeenkomst geldig en afdwingbaar blijft.
            </p>

            <h2 className="text-2xl font-semibold mb-6">12. Toepasselijk Recht en Jurisdictie</h2>
            <p className="text-xl text-gray-600 font-light mb-12">
              Deze Overeenkomst wordt beheerst door de Nederlandse wetgeving. Alle geschillen die voortvloeien uit deze Voorwaarden vallen onder de exclusieve jurisdictie van de rechtbanken in Nederland.
            </p>

            <h2 className="text-2xl font-semibold mb-6">13. Contact</h2>
            <p className="text-xl text-gray-600 font-light">
              Voor vragen of opmerkingen kun je contact opnemen via:
              <br /><br />
              Voicelabs<br />
              Den Haag, Nederland
              <br /><br />
              E-mail: contact@voicelabs.nl
              <br /><br />
              Laatste update: 24 september 2024
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
} 