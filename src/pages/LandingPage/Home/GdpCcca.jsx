import { Link } from 'react-router-dom';
import { ccpapng ,gdprpng} from '../../../asset'

const GdpCcca = () => {
  return (
    <div style={{ padding: '40px 20px', backgroundColor: '#f9f9f9', textAlign: 'center' }}>
       <div className="col-lg-12 midhead">
              <h2>GDPR & CCPA Compliance</h2>
              <div className="separator separator-danger">✻</div>
            </div>
      {/* <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>GDPR & CCPA Compliance</h2> */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
        <div style={{ maxWidth: '300px' }}>
         <Link to="privacy-policy"> <img
            src={gdprpng}
            alt="GDPR Compliance"
            style={{ width: '100%', borderRadius: '10px', marginBottom: '10px' }}
          /></Link>
          {/* <h4 style={{ fontSize: '18px', marginBottom: '8px' }}>GDPR</h4>
          <p style={{ fontSize: '14px', color: '#555' }}>
            We ensure all user data is handled according to GDPR regulations to maintain transparency and privacy.
          </p> */}
        </div>
        <div style={{ maxWidth: '300px' }}>
        <Link to="privacy-policy">     <img
            src={ccpapng}
            alt="CCPA Compliance"
            style={{ width: '100%', borderRadius: '10px', marginBottom: '10px' }}
          /></Link>
          {/* <h4 style={{ fontSize: '18px', marginBottom: '8px' }}>CCPA</h4>
          <p style={{ fontSize: '14px', color: '#555' }}>
            Our platform is fully compliant with CCPA laws to protect the personal data of California residents.
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default GdpCcca;
