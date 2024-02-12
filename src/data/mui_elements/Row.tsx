import { 
    TableCell,
    TableRow
} from "@mui/material";
import React from "react";

interface RowProps {
    item: any;
    arr_count_columns_xml: any;
}

export const Row = (
    { 
        item,
        arr_count_columns_xml
    }: RowProps
) => {
    if (item["table"]["TableName"] === 'ExpertOrganization') {
        return (
            <React.Fragment>
                {arr_count_columns_xml.map((row:any) => (
                    <TableRow key={row} className="table_row" sx={{ '& > *': { borderBottom: 'unset' }, paddingTop: '10px' }}>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_org_full_name_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_org_ogrn_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_org_inn_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_org_kpp_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_region_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_city_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_street_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_building_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_room_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_id_transaction"]}
                        </TableCell>
                    </TableRow>
                ))}
            </React.Fragment>
        );
    }
    
    else if (item["table"]["TableName"] === 'Approver') {
        return (
            <React.Fragment>
                {arr_count_columns_xml.map((row:any) => (
                    <TableRow key={row} sx={{ '& > *': { borderBottom: 'unset' }, paddingTop: '10px' }}>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_family_name_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_first_name_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_second_name_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_position_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_id_transaction"]}
                        </TableCell>
                    </TableRow>
                ))}
            </React.Fragment>
        );
    }
    
    else if (item["table"]["TableName"] === 'ExaminationObject') {
        return (
            <React.Fragment>
                {arr_count_columns_xml.map((row:any) => (
                    <TableRow key={row} sx={{ '& > *': { borderBottom: 'unset' }, paddingTop: '10px' }}>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_org_full_name_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_org_ogrn_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_org_inn_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_org_kpp_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_region_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_city_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_street_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_building_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_room_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_id_transaction"]}
                        </TableCell>
                    </TableRow>
                  ))}
            </React.Fragment>
          );
    }
    
    else if (item["table"]["TableName"] === 'Documents') {
        return (
            <React.Fragment>
                {arr_count_columns_xml.map((row:any) => (
                    <TableRow key={row} sx={{ '& > *': { borderBottom: 'unset' }, paddingTop: '10px' }}>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_document_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_doc_type_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_doc_name_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_doc_number_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_doc_date_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_doc_issue_author_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_file_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_file_name_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_file_format_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_file_checksum_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_file_name_1_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_file_format_1_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_file_checksum_1_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_id_transaction"]}
                        </TableCell>
                    </TableRow>
                ))}
            </React.Fragment>
          );
    }
    
    else if (item["table"]["TableName"] === 'PreviousConclusions') {
        return (
            <React.Fragment>
                {arr_count_columns_xml.map((row:any) => (
                    <TableRow key={row} sx={{ '& > *': { borderBottom: 'unset' }, paddingTop: '10px' }}>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_previous_conclusion_value"]}
                        </TableCell>

                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_date_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_number_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_egrz_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_examination_object_type_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_name_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_result_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_id_transaction"]}
                        </TableCell>
                    </TableRow>
                ))}
            </React.Fragment>
        );
    }
    
    else if (item["table"]["TableName"] === 'PreviousSimpleConclusions') {
        return (
            <React.Fragment>
                {arr_count_columns_xml.map((row:any) => (
                    <TableRow key={row} sx={{ '& > *': { borderBottom: 'unset' }, paddingTop: '10px' }}>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_previous_simple_conclusion_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_date_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_number_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_result_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_id_transaction"]}
                        </TableCell>
                    </TableRow>
                ))}
            </React.Fragment>
        );
    }
    
    else if (item["table"]["TableName"] === 'Object') {
        return (
            <React.Fragment>
                {arr_count_columns_xml.map((row:any) => (
                    <TableRow key={row} sx={{ '& > *': { borderBottom: 'unset' }, paddingTop: '10px' }}>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_name_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_type_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_functions_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_country_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_region_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_city_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_note_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_tei_name_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_tei_measure_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_tei_value_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_id_transaction"]}
                        </TableCell>
                    </TableRow>
                ))}
            </React.Fragment>
        );
    }
    
    else if (item["table"]["TableName"] === 'Declarant') {
        return (
            <React.Fragment>
                {arr_count_columns_xml.map((row:any) => (
                    <TableRow key={row} sx={{ '& > *': { borderBottom: 'unset' }, paddingTop: '10px' }}>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_organization_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_org_full_name_value"]}
                        </TableCell>

                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_org_ogrn_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_org_inn_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_org_kpp_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_region_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_city_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_street_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_building_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_room_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_id_transaction"]}
                        </TableCell>
                    </TableRow>
                ))}
            </React.Fragment>
        );
    }
    
    else if (item["table"]["TableName"] === 'ProjectDocumentsDeveloper') {
        return (
            <React.Fragment>
                {arr_count_columns_xml.map((row:any) => (
                    <TableRow key={row} sx={{ '& > *': { borderBottom: 'unset' }, paddingTop: '10px' }}>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_organization_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_org_full_name_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_org_ogrn_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_org_inn_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_org_kpp_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_region_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_city_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_street_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_building_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_room_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_id_transaction"]}
                        </TableCell>
                    </TableRow>
                ))}
            </React.Fragment>
        );
    }
    
    else if (item["table"]["TableName"] === 'Finance') {
        return (
            <React.Fragment>
                {arr_count_columns_xml.map((row:any) => (
                    <TableRow key={row} sx={{ '& > *': { borderBottom: 'unset' }, paddingTop: '10px' }}>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_finance_type"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_finance_size"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_id_transaction"]}
                        </TableCell>
                    </TableRow>
                  ))}
            </React.Fragment>
          );
    }
    
    else if (item["table"]["TableName"] === 'ClimateConditions') {
        return (
            <React.Fragment>
                {arr_count_columns_xml.map((row:any) => (
                    <TableRow key={row} sx={{ '& > *': { borderBottom: 'unset' }, paddingTop: '10px' }}>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_climate_district_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_geological_conditions_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_seismic_activity_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_snow_district_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_wind_district_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_id_transaction"]}
                        </TableCell>
                    </TableRow>
                  ))}
            </React.Fragment>
        );
    }
    
    else if (item["table"]["TableName"] === 'ClimateConditionsNote') {
        return (
            <React.Fragment>
                {arr_count_columns_xml.map((row:any) => (
                    <TableRow key={row} sx={{ '& > *': { borderBottom: 'unset' }, paddingTop: '10px' }}>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_climate_conditions_note_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_id_transaction"]}
                        </TableCell>
                    </TableRow>
                ))}
            </React.Fragment>
        );
    }
    
    else if (item["table"]["TableName"] === 'CadastralNumber') {
        return (
            <React.Fragment>
                {arr_count_columns_xml.map((row:any) => (
                    <TableRow key={row} sx={{ '& > *': { borderBottom: 'unset' }, paddingTop: '10px' }}>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_cadastral_number_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_id_transaction"]}
                        </TableCell>
                    </TableRow>
                ))}
            </React.Fragment>
        );
    }
    
    else if (item["table"]["TableName"] === 'ExpertProjectDocuments') {
        return (
            <React.Fragment>
                {arr_count_columns_xml.map((row:any) => (
                    <TableRow key={row} sx={{ '& > *': { borderBottom: 'unset' }, paddingTop: '10px' }}>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_project_documents_review"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_id_transaction"]}
                        </TableCell>
                    </TableRow>
                ))}
            </React.Fragment>
        );
    }
    
    else if (item["table"]["TableName"] === 'Experts') {
        return (
            <React.Fragment>
                {arr_count_columns_xml.map((row:any) => (
                    <TableRow key={row} sx={{ '& > *': { borderBottom: 'unset' }, paddingTop: '10px' }}>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_expert_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_family_name_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_first_name_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_second_name_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_expert_type_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_expert_certificate_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_expert_certificate_begindate_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_expert_certificate_end_date_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_id_transaction"]}
                        </TableCell>
                    </TableRow>
                ))}
            </React.Fragment>
        );
    }
    
    else if (item["table"]["TableName"] === 'Designer') {
        return (
            <React.Fragment>
                {arr_count_columns_xml.map((row:any) => (
                    <TableRow key={row} sx={{ '& > *': { borderBottom: 'unset' }, paddingTop: '10px' }}>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_building_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_city_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_country_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_family_name_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_first_name_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_ip_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_ogrnip_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_post_address_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_post_index_value"]}
                        </TableCell>                                      
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_region_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_room_value"]}
                        </TableCell>                                      
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_second_name_value"]}
                        </TableCell>                                      
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_street_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_id_transaction"]}
                        </TableCell>
                    </TableRow>
                ))}
            </React.Fragment>
        );
    }

    else if (item["table"]["TableName"] === 'Summary') {
        return (
            <React.Fragment>
                {arr_count_columns_xml.map((row:any) => (
                    <TableRow key={row} sx={{ '& > *': { borderBottom: 'unset' }, paddingTop: '10px' }}>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_engineering_survey_type_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_examination_summary_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_project_documents_summary_date_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_project_documents_summary_value"]}
                        </TableCell>
                        <TableCell>
                            {item["value_columns"][0]["name_"+row+"_id_transaction"]}
                        </TableCell>
                    </TableRow>
                ))}
            </React.Fragment>
        );
    }

    else {
        return (
            <TableRow sx={{ '& > *': { borderBottom: 'unset' }, paddingTop: '10px' }}>
                <TableCell>null</TableCell>
            </TableRow>
        );
    }
};