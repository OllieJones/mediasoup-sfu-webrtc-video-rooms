require('dotenv').config()
const os = require('os')

console.log (process.env.HTTPS_CERT_FULLCHAIN, process.env.HTTPS_CERT_PRIVKEY)

module.exports = {
    listenIp: process.env.MEDIASOUP_LISTEN_IP || '0.0.0.0',
    listenPort: process.env.PORT || 3016,
    sslCrt: process.env.HTTPS_CERT_FULLCHAIN ||'../ssl/cert.pem',
    sslKey: process.env.HTTPS_CERT_PRIVKEY || '../ssl/key.pem',
    
    mediasoup: {
      // Worker settings
      numWorkers : Object.keys(os.cpus()).length,
      worker: {
        rtcMinPort: 10000,
        rtcMaxPort: 10100,
        logLevel: 'warn',
        logTags: [
          'info',
          'ice',
          'dtls',
          'rtp',
          'srtp',
          'rtcp',
          // 'rtx',
          // 'bwe',
          // 'score',
          // 'simulcast',
          // 'svc'
        ],
      },
      // Router settings
      router: {
        mediaCodecs:
          [
            {
              kind: 'audio',
              mimeType: 'audio/opus',
              clockRate: 48000,
              channels: 2
            },
            {
              kind: 'video',
              mimeType: 'video/VP8',
              clockRate: 90000,
              parameters:
                {
                  'x-google-start-bitrate': 1000
                }
            },
          ]
      },
    // WebRtcTransport settings
    webRtcTransport: {
        listenIps: [
          {
            ip: '0.0.0.0',      
            announcedIp:process.env.MEDIASOUP_ANNOUNCED_IP || '127.0.0.1' // replace by public IP address
          }
        ],
        maxIncomingBitrate: 1500000,
        initialAvailableOutgoingBitrate: 1000000
    },
    }
  };
  
