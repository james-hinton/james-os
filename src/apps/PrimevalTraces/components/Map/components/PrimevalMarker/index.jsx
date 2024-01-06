import L from "leaflet";
import { Marker, Popup } from "react-leaflet";
import FossilIcon from "../../../../assets/fossil-1.svg";

const PrimevalMarker = ({ position, fossil, setIsOpenTooltip }) => {
  const icon = new L.Icon({
    iconUrl: FossilIcon,
    iconRetinaUrl: FossilIcon,
    iconAnchor: [5, 55],
    popupAnchor: [10, -44],
    iconSize: [25, 55],
    shadowSize: [68, 95],
    shadowAnchor: [20, 92],
  });

  const handleOpen = () => {
    setIsOpenTooltip(true);
  };

  const handleClose = () => {
    setIsOpenTooltip(false);
  };

  const renderPopupContent = () => {
    // Destructure and rename variables for clarity
    let {
      aut: author,
      idn: identifier,
      tna: taxonomicName,
      oid: orderID,
      cid: collectionID,
      cnm: collectionName,
      eag: earliestAge,
      lag: latestAge,
      ggc: geogComment,
      cc2: country,
      oei: overallExistInterval,
      stp: stratPhylum,
      tid: taxonID,
      rid: referenceID,
      phl: phylum,
      cll: class_,
      szn: speciesName,
      odl: order,
      fml: family,
      more,
    } = fossil;

    // Helper function to remove prefixes
    const removePrefix = (id, prefix) => id && id.replace(prefix, "");

    // Remove prefixes from IDs
    taxonID = removePrefix(taxonID, "txn:");
    collectionID = removePrefix(collectionID, "col:");
    orderID = removePrefix(orderID, "occ:");
    referenceID = removePrefix(referenceID, "ref:");

    if (order === "NO_ORDER_SPECIFIED") order = null;
    if (phylum === "NO_PHYLUM_SPECIFIED") phylum = null;
    if (class_ === "NO_CLASS_SPECIFIED") class_ = null;
    if (family === "NO_FAMILY_SPECIFIED") family = null;

    return (
      <div>
        <h3>
          {identifier} ({taxonomicName})
        </h3>
        {/* Temporal Interval section */}
        {earliestAge && latestAge && (
          <p>
            <strong>Temporal Interval:</strong> {earliestAge} EAG to {latestAge}{" "}
            LAG ({overallExistInterval && overallExistInterval})
          </p>
        )}
        {/* Location section */}
        {geogComment ? (
          <p>
            <strong>Location:</strong> {geogComment}
          </p>
        ) : (
          collectionName && (
            <p>
              <strong>Location:</strong> {collectionName}
            </p>
          )
        )}
        {/* Species Name section */}
        {speciesName && (
          <p>
            <strong>Species Name:</strong> {speciesName}
          </p>
        )}
        {/* Taxonomic Classification section */}
        <p>
          {phylum && (
            <span>
              <strong>Phylum:</strong> {phylum}
            </span>
          )}
          {class_ && (
            <span>
              {phylum && ", "}
              <strong>Class:</strong> {class_}
            </span>
          )}
          {order && (
            <span>
              {(phylum || class_) && ", "}
              <strong>Order:</strong> {order}
            </span>
          )}
          {family && (
            <span>
              {(phylum || class_ || order) && ", "}
              <strong>Family:</strong> {family}
            </span>
          )}
        </p>
        {/* Taxon ID section */}
        {taxonID && (
          <p>
            <strong>Taxon ID: </strong>
            <a
              href={`https://paleobiodb.org/classic/basicTaxonInfo?taxon_no=${taxonID}`}
              target="_blank"
              rel="noreferrer"
            >
              {taxonID}
            </a>
          </p>
        )}
        {/* Reference section */}
        {referenceID && (
          <p>
            <strong>Reference: </strong>
            {author && author} (
            <a
              href={`https://paleobiodb.org/classic/displayReference?reference_no=${referenceID}&is_real_user=1`}
              target="_blank"
              rel="noreferrer"
            >
              {referenceID}
            </a>
            )
          </p>
        )}
        {more > 0 && (
          <div
            style={{
              width: "100%",
              color: "gray",
            }}
          >
            <small>{more} more fossils found at this location</small>
          </div>
        )}
      </div>
    );
  };

  return (
    <Marker
      position={position}
      icon={icon}
      eventHandlers={{
        popupopen: handleOpen,
        popupclose: handleClose,
      }}
    >
      <Popup>{renderPopupContent()}</Popup>
    </Marker>
  );
};

export default PrimevalMarker;
