import { Card, CardHeader, CardContent } from '~/components/ui/card'

const PrivacyPolicyPageView = () => {
  return (
    <div className="mb-4 mt-14 w-full max-w-3xl">
      <Card className="rounded-lg bg-slate-100 shadow-lg">
        <CardHeader className="text-center text-3xl font-bold sm:text-4xl md:text-5xl">
          Privacy Policy
        </CardHeader>
        <CardContent className="p-2 md:p-10">
          <p>
            This Privacy Policy describes how we collect, use, and protect
            your personal data when you visit and interact with our
            website. We are committed to safeguarding your privacy and
            ensuring that your personal information is protected in
            accordance with applicable data protection laws, including the
            General Data Protection Regulation (GDPR).
          </p>

          <h3 className="mt-6 text-xl font-bold">1. Introduction</h3>

          <p>
            We operate this website as a non-commercial demonstration
            project. While our primary goal is to provide information and
            showcase our work, we respect your right to privacy. This
            policy explains how we handle any personal data you provide to
            us through your use of the site.
          </p>

          <h3 className="mt-6 text-xl font-bold">2. Data Collection</h3>

          <h4 className="mt-4 text-lg font-bold">2.1. Personal Data</h4>

          <p>
            We may collect the following personal data when you interact
            with our website:
          </p>

          <ul className="ml-4 list-inside list-disc">
            <li>Your name</li>

            <li>Email address</li>

            <li>
              Any other information you voluntarily provide through contact
              forms, registration, or other interactive features
            </li>
          </ul>

          <h4 className="mt-4 text-lg font-bold">2.2. Usage Data</h4>

          <p>We automatically collect usage data such as:</p>

          <ul className="ml-4 list-inside list-disc">
            <li>IP address</li>

            <li>Browser type and version</li>

            <li>Pages visited and time spent on the website</li>

            <li>Referring URL</li>
          </ul>

          <p>
            This information is used to help us understand how visitors
            interact with our site and to improve our content and services.
          </p>

          <h3 className="mt-6 text-xl font-bold">3. Use of Data</h3>

          <p>We use the collected data for the following purposes:</p>

          <ul className="ml-4 list-inside list-disc">
            <li>To provide and maintain our website</li>

            <li>To communicate with you regarding inquiries or updates</li>

            <li>To analyze and improve website performance</li>

            <li>To comply with legal obligations</li>
          </ul>

          <p>
            Your data will not be sold or shared with third parties for
            marketing purposes.
          </p>

          <h3 className="mt-6 text-xl font-bold">4. Data Sharing</h3>

          <p>
            We do not share your personal data with third parties except in
            the following cases:
          </p>

          <ul className="ml-4 list-inside list-disc">
            <li>When required by law or legal process</li>

            <li>To protect our rights and safety or that of our users</li>

            <li>
              In connection with a merger or acquisition, where the new
              entity may assume responsibility for the data under the same
              privacy policy
            </li>
          </ul>

          <h3 className="mt-6 text-xl font-bold">5. Security Measures</h3>

          <p>
            We implement appropriate technical and organizational measures
            to ensure the security of your personal data. While we strive
            to protect your information, no security system is completely
            infallible. Therefore, we cannot guarantee absolute security.
          </p>

          <h3 className="mt-6 text-xl font-bold">6. Your Rights</h3>

          <p>
            Under the GDPR and other applicable data protection laws, you
            have the following rights regarding your personal data:
          </p>

          <ul className="ml-4 list-inside list-disc">
            <li>
              The right to access – request a copy of your personal data
            </li>

            <li>
              The right to rectification – request correction of inaccurate
              or incomplete data
            </li>

            <li>
              The right to erasure – request deletion of your personal data
            </li>

            <li>
              The right to restrict processing – request a restriction on
              how your data is used
            </li>

            <li>
              The right to data portability – request transfer of your data
              to another organization
            </li>

            <li>
              The right to object – object to the processing of your data
              under certain circumstances
            </li>
          </ul>

          <p>
            To exercise any of these rights, please contact us using the
            details provided below.
          </p>

          <h3 className="mt-6 text-xl font-bold">
            7. Contact Information
          </h3>

          <p>
            If you have any questions about this Privacy Policy or our data
            practices, please contact us at:
          </p>

          <p>
            Email:{' '}
            <a
              href="mailto:andrey.golubenko.it@gmail.com"
              className="text-blue-600"
            >
              andrey.golubenko.it@gmail.com
            </a>
          </p>

          <h3 className="mt-6 text-xl font-bold">
            8. Changes to This Policy
          </h3>

          <p>
            We may update this Privacy Policy from time to time. Any
            changes will be posted on this page with an updated revision
            date. We encourage you to review our Privacy Policy
            periodically to stay informed about how we protect your data.
          </p>

          <p className="mt-6">
            By using our website, you acknowledge that you have read and
            understood this Privacy Policy. If you do not agree with our
            policies and practices, please do not use our website.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default PrivacyPolicyPageView
