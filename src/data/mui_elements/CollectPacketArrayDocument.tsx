import { GetPacketDocumentZip } from "../../data/api/file/GetPacketDocumentZip";
import { Tooltip, IconButton } from "@mui/material";
import { FolderZip } from "@mui/icons-material";

export const CollectPacketArrayDocument = () => {
	return (
		<Tooltip title="Собрать пакет документов" onClick={() => GetPacketDocumentZip()}>
            <IconButton>
                <FolderZip />
            </IconButton>
        </Tooltip>
	)
}