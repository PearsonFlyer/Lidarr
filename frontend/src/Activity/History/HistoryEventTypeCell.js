import PropTypes from 'prop-types';
import React from 'react';
import Icon from 'Components/Icon';
import TableRowCell from 'Components/Table/Cells/TableRowCell';
import { icons, kinds } from 'Helpers/Props';
import translate from 'Utilities/String/translate';
import styles from './HistoryEventTypeCell.css';

function getIconName(eventType, data) {
  switch (eventType) {
    case 'grabbed':
      return icons.DOWNLOADING;
    case 'artistFolderImported':
      return icons.DRIVE;
    case 'trackFileImported':
      return icons.DOWNLOADED;
    case 'downloadFailed':
      return icons.DOWNLOADING;
    case 'trackFileDeleted':
      return data.reason === 'MissingFromDisk' ? icons.FILE_MISSING : icons.DELETE;
    case 'trackFileRenamed':
      return icons.ORGANIZE;
    case 'trackFileRetagged':
      return icons.RETAG;
    case 'albumImportIncomplete':
      return icons.DOWNLOADED;
    case 'downloadImported':
      return icons.DOWNLOADED;
    case 'downloadIgnored':
      return icons.IGNORE;
    default:
      return icons.UNKNOWN;
  }
}

function getIconKind(eventType) {
  switch (eventType) {
    case 'downloadFailed':
      return kinds.DANGER;
    case 'albumImportIncomplete':
      return kinds.WARNING;
    default:
      return kinds.DEFAULT;
  }
}

function getTooltip(eventType, data) {
  switch (eventType) {
    case 'grabbed':
      return `Album grabbed from ${data.indexer} and sent to ${data.downloadClient}`;
    case 'artistFolderImported':
      return 'Track imported from artist folder';
    case 'trackFileImported':
      return 'Track downloaded successfully and picked up from download client';
    case 'downloadFailed':
      return 'Album download failed';
    case 'trackFileDeleted':
      return data.reason === 'MissingFromDisk' ? translate('TrackFileMissingTooltip') : translate('TrackFileDeletedTooltip');
    case 'trackFileRenamed':
      return translate('TrackFileRenamedTooltip');
    case 'trackFileRetagged':
      return translate('TrackFileTagsUpdatedTooltip');
    case 'albumImportIncomplete':
      return 'Files downloaded but not all could be imported';
    case 'downloadImported':
      return 'Download completed and successfully imported';
    case 'downloadIgnored':
      return 'Album Download Ignored';
    default:
      return 'Unknown event';
  }
}

function HistoryEventTypeCell({ eventType, data }) {
  const iconName = getIconName(eventType, data);
  const iconKind = getIconKind(eventType);
  const tooltip = getTooltip(eventType, data);

  return (
    <TableRowCell
      className={styles.cell}
      title={tooltip}
    >
      <Icon
        name={iconName}
        kind={iconKind}
      />
    </TableRowCell>
  );
}

HistoryEventTypeCell.propTypes = {
  eventType: PropTypes.string.isRequired,
  data: PropTypes.object
};

HistoryEventTypeCell.defaultProps = {
  data: {}
};

export default HistoryEventTypeCell;
