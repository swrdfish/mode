export class RtcConf implements RTCConfiguration{
    bundlePolicy?: RTCBundlePolicy;
    iceServers?: RTCIceServer[];
    iceTransportPolicy?: RTCIceTransportPolicy;
    peerIdentity?: string;

    constructor(servers: Array<RTCIceServer>) {
        this.iceServers = servers;
    }
}



export class IceServer implements RTCIceServer{
    credential?: string;
    urls?: any;
    username?: string;
    constructor(urls) {
        this.urls = urls;
    }
}