import { NavLink } from 'react-router-dom'
import Seo from '../components/Seo'

export default function Dmca() {
  return (
    <div className="container">
      <Seo
        title="DMCA / Legal"
        description="DMCA and legal information for the Dantotsu Updater community website."
      />
      <article className="page-article">
        <h1>DMCA / Legal</h1>

        <section aria-labelledby="dmca-notice-title">
          <h2 id="dmca-notice-title">Copyright notice</h2>
          <p>
            This website does not host, store, upload, modify, repackage, or
            distribute anime, manga, streams, or other copyrighted media. This
            website only provides informational links to publicly available
            third-party software sources.
          </p>
          <p>
            All trademarks and copyrights belong to their respective owners.
            Users download and use any linked software at their own risk.
          </p>
        </section>

        <section aria-labelledby="takedown-title">
          <h2 id="takedown-title">Submitting a takedown request</h2>
          <p>
            If you believe content linked from this site infringes your
            copyright, please send a DMCA notice to{' '}
            <a href="mailto:dmca@example.com">dmca@example.com</a>.
          </p>
          <p>
            Your takedown request should include the following information:
          </p>
          <ol>
            <li>
              The name and contact information of the copyright holder or the
              person authorized to act on their behalf.
            </li>
            <li>
              Identification of the copyrighted work that you claim has been
              infringed.
            </li>
            <li>
              The exact URL being reported so the content can be located.
            </li>
            <li>
              A good-faith statement that the use of the material is not
              authorized by the copyright owner, its agent, or the law.
            </li>
            <li>
              A statement that the information in the notice is accurate, and
              under penalty of perjury, that you are authorized to act on behalf
              of the copyright owner.
            </li>
            <li>
              An electronic or physical signature of the person authorized to
              act on behalf of the copyright owner.
            </li>
          </ol>
        </section>

        <section aria-labelledby="counter-notice-title">
          <h2 id="counter-notice-title">Counter-notice</h2>
          <p>
            If your content was removed or disabled as a result of a mistake or
            misidentification, you may submit a counter-notice to{' '}
            <a href="mailto:dmca@example.com">dmca@example.com</a>. The
            counter-notice must include your contact information, a description
            of the material that was removed, a statement under penalty of
            perjury that the material was removed due to a mistake or
            misidentification, consent to the jurisdiction of the appropriate
            court, and your electronic or physical signature.
          </p>
        </section>

        <p>
          <NavLink to="/">← Back to home</NavLink>
        </p>
      </article>
    </div>
  )
}
