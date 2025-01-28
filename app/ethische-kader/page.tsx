import Header from '../components/Header';
import Footer from '../components/Footer';

export default function EthischeKader() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-sm font-medium text-gray-500 tracking-wide mb-6">Ethisch Kader</div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <h1 className="text-[56px] leading-[1.1] mb-6">
              Onze principes voor <br />
              <span className="text-[#0063f2]">ethische AI.</span>
            </h1>
            <p className="text-xl text-gray-600 font-light mt-4 lg:mt-8">
              Bij Voicelabs zetten we ons in voor het ontwikkelen van AI die niet alleen geavanceerd is, maar ook ethisch en verantwoord.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-24 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg">
            <p className="text-xl text-gray-600 font-light mb-12">
              Bij Voicelabs zetten we ons in om de kracht van AI te benutten voor het algemeen belang. We geloven in het creëren van technologie die niet alleen geavanceerd is, maar ook ethisch en verantwoord. Onze principes vormen de hoeksteen van onze toewijding om ervoor te zorgen dat onze AI een kracht is voor positieve verandering.
            </p>

            <h2 className="text-2xl font-semibold mb-6">Verantwoordelijkheid en Nauwkeurigheid</h2>
            <p className="text-xl text-gray-600 font-light mb-12">
              Verantwoordelijkheid staat centraal in onze activiteiten. Voicelabs handhaaft streng toezicht en regelmatige beoordelingen om ervoor te zorgen dat onze AI functioneert zoals bedoeld, met nauwkeurigheid en eerlijkheid. We nemen de verantwoordelijkheid voor onze AI, en zorgen voor betrouwbaarheid en consistentie in elke toepassing.
            </p>

            <h2 className="text-2xl font-semibold mb-6">Privacy, Dataminimalisatie en Beveiliging</h2>
            <p className="text-xl text-gray-600 font-light mb-12">
              Bij Voicelabs hanteren we de hoogste standaarden voor gegevensprivacy en beveiliging. Onze aanpak omvat:
              <br /><br />
              • Het gebruik van minimaal noodzakelijke gegevens<br />
              • Geen gebruik van persoonlijke gegevens voor AI-training<br />
              • Strikte opslag van alle informatie binnen de EU om te voldoen aan de strenge wetgeving voor gegevensbescherming<br />
              • Integratie van deze praktijken in onze AI vanaf de basis<br />
              • Waarborging van data-integriteit en vertrouwelijkheid van gebruikers
            </p>

            <h2 className="text-2xl font-semibold mb-6">Transparantie en Duidelijkheid</h2>
            <p className="text-xl text-gray-600 font-light mb-12">
              We zetten ons in om AI begrijpelijk en duidelijk te maken. Voicelabs streeft naar heldere communicatie over de mogelijkheden en beperkingen van onze AI. Ons doel is ervoor te zorgen dat gebruikers begrijpen hoe onze AI werkt en welke principes de werking ervan sturen, waardoor vertrouwen en geïnformeerde betrokkenheid worden bevorderd.
            </p>

            <h2 className="text-2xl font-semibold mb-6">Mens-eerst Benadering</h2>
            <p className="text-xl text-gray-600 font-light mb-12">
              We stellen het menselijk welzijn voorop in elk aspect van onze AI-ontwikkeling. Onze technologie is ontworpen om:
              <br /><br />
              • Het leven te verbeteren<br />
              • Mensenrechten te respecteren<br />
              • De waardigheid van alle individuen te waarborgen<br />
              • Menselijke capaciteiten aan te vullen<br />
              • Een harmonieuze relatie tussen mens en machine te creëren
            </p>

            <h2 className="text-2xl font-semibold mb-6">Eerlijkheid voor Iedereen</h2>
            <p className="text-xl text-gray-600 font-light mb-12">
              De AI van Voicelabs staat voor gelijkheid. We streven ernaar technologie te bouwen die:
              <br /><br />
              • Inclusief en rechtvaardig is<br />
              • Actief elke vorm van vooroordelen of discriminatie voorkomt<br />
              • Eerlijk en toegankelijk is voor iedereen, ongeacht achtergrond<br />
              • Diversiteit en inclusie bevordert<br />
              • Bijdraagt aan een rechtvaardige samenleving
            </p>

            <h2 className="text-2xl font-semibold mb-6">Onze Toewijding</h2>
            <p className="text-xl text-gray-600 font-light">
              Deze ethische principes zijn niet alleen richtlijnen - ze zijn fundamenteel voor alles wat we doen bij Voicelabs. We evalueren en updaten deze principes regelmatig om ervoor te zorgen dat ze relevant blijven en de hoogste ethische standaarden weerspiegelen.
              <br /><br />
              Voor vragen over ons ethisch kader kun je contact opnemen via:
              <br /><br />
              Voicelabs<br />
              Den Haag, Nederland
              <br /><br />
              E-mail: contact@voicelabs.nl
              <br /><br />
              Laatste update: 1 maart 2024
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
} 