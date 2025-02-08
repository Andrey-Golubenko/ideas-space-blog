import { Card, CardHeader, CardContent } from '~/components/ui/card'

const ImpressumPageView = () => {
  return (
    <div className="mb-4 mt-14 w-full max-w-3xl">
      <Card className="rounded-lg bg-slate-100 shadow-lg">
        <CardHeader className="text-center text-3xl font-bold sm:text-4xl md:text-5xl">
          Impressum
        </CardHeader>
        <CardContent className="p-2 md:p-10">
          <h4 className="text-center text-2xl font-bold">
            English Version
          </h4>

          <div className="mt-4 text-center text-lg leading-8 text-slate-700">
            <p>
              <strong>Operator of this website:</strong>
            </p>

            <p>Andrey Golubenko</p>

            <p>
              Email:{' '}
              <a
                href="mailto:andrey.golubenko.it@gmail.com"
                className="text-blue-600"
              >
                andrey.golubenko.it@gmail.com
              </a>
            </p>

            <p className="mt-4">
              <strong>Responsible for content :</strong>
            </p>

            <p>Andrey Golubenko</p>

            <p className="mt-4">
              This project is solely a demonstration of the portfolio and
              does not pursue any commercial, functional or any other
              goals. It exists solely as a demonstration and is not
              intended for any real-world application.
            </p>

            <p className="mt-4">
              <strong>Disclaimer:</strong>
            </p>

            <p>
              The published content belongs to persons using the
              demonstrative features of the platform. The Operator is not
              responsible for the content created by third parties, but
              undertakes to immediately remove illegal content after
              receiving notification.
            </p>

            <p className="mt-4">
              <strong>Note:</strong> This website serves exclusively as a
              demonstration project for a portfolio. It was created for
              illustrative purposes only and has no commercial or any
              others function or intent.
            </p>
          </div>

          <hr className="my-6 border-t-2 border-slate-300" />

          <h4 className="text-center text-2xl font-bold">
            Deutsche Version
          </h4>

          <div className="mt-4 text-center text-lg leading-8 text-slate-700">
            <p>
              <strong>Betreiber dieser Webseite:</strong>
            </p>

            <p>Andrey Golubenko</p>

            <p>
              Email:{' '}
              <a
                href="mailto:andrey.golubenko.it@gmail.com"
                className="text-blue-600"
              >
                andrey.golubenko.it@gmail.com
              </a>
            </p>

            <p className="mt-4">
              <strong>Verantwortlich für den Inhalt:</strong>
            </p>

            <p>Andrey Golubenko</p>

            <p className="mt-4">
              Diese Webseite ist ausschließlich ein Portfolio-Schaufenster
              und dient keinem kommerziellen oder sonstigen Funktionen oder
              Absichten. Es existiert nur als Demonstration und ist nicht
              für eine reale Anwendung gedacht.
            </p>

            <p className="mt-4">
              <strong>Haftungsausschluss:</strong>
            </p>

            <p>
              Die veröffentlichten Inhalte gehören Personen, die die
              demonstrativen Funktionen der Plattform nutzen. Der Betreiber
              ist nicht für von Dritten erstellte Inhalte verantwortlich,
              verpflichtet sich jedoch, illegale Inhalte nach Erhalt der
              Benachrichtigung sofort zu entfernen.
            </p>

            <p className="mt-4">
              <strong>Hinweis:</strong> Diese Website ist ausschließlich
              für ein Demo-Portfolio-Projekt vorgesehen. Es wurde
              ausschließlich zu illustrativen Zwecken erstellt und hat
              keine kommerziellen oder sonstigen Funktionen oder Absichten.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ImpressumPageView
