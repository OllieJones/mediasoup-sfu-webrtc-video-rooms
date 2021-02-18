require('dotenv').config()
const os = require('os')


const rtcMinPort = process.env.RTC_MIN_PORT || 10000
const rtcPortCount = process.env.RTC_PORT_COUNT || 10

module.exports = {
    listenIp: process.env.MEDIASOUP_LISTEN_IP || '0.0.0.0',
    listenPort: process.env.PORT || 3016,
    useProxy: (process.env.USE_PROXY && process.env.USE_PROXY === 'true') || false,
    sslCrt: process.env.HTTPS_CERT_FULLCHAIN || '../ssl/cert.pem',
    sslKey: process.env.HTTPS_CERT_PRIVKEY || '../ssl/key.pem',
    
    mediasoup: {
      // Worker settings
      numWorkers : Object.keys(os.cpus()).length - 1,
      worker: {
        rtcMinPort: rtcMinPort,
        rtcMaxPort: rtcMinPort + rtcPortCount,
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
  
