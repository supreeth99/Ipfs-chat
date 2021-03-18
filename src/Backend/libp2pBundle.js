import Libp2p from "libp2p";
import Bootstrap from "libp2p-bootstrap";
import Websockets from "libp2p-websockets";
import WebRTCStar from "libp2p-webrtc-star";
import GossipSub from "libp2p-gossipsub";
import KadDHT from "libp2p-kad-dht";
import MPLEX from "libp2p-mplex";
import { NOISE } from "libp2p-noise";
import PubsubPeerDiscovery from "libp2p-pubsub-peer-discovery";
import Floodsub from "libp2p-floodsub";

const libp2pBundle = (opts) => {
    const peerId = opts.peerId;
    const bootstrapList = opts.config.Bootstrap;
    return new Libp2p({
        peerId,
        addresses: {
            listen: [
                "/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star/",
                "/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star/",
            ],
        },
        modules: {
            transport: [Websockets, WebRTCStar],
            streamMuxer: [MPLEX],
            connEncryption: [NOISE],
            peerDiscovery: [Bootstrap, PubsubPeerDiscovery],
            dht: KadDHT,
            pubsub: Floodsub,
        },
        config: {
            peerDiscovery: {
                [Bootstrap.tag]: {
                    enabled: true,
                    list: bootstrapList,
                    interval: 3000,
                },
                [WebRTCStar.tag]: {
                    enabled: true,
                },
                [PubsubPeerDiscovery.tag]: {
                    interval: 1000,
                    enabled: true,
                },
            },
            pubsub: {
                emitSelf: false,
                enabled: true,
            },
        },
    });
};

export default libp2pBundle;
