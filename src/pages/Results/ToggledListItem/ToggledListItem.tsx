import React, {ReactNode, useState} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveIcon from '@mui/icons-material/Remove';

interface PanelData {
    id: string;
    header: string;
    Content: ReactNode;
}

const panels: PanelData[] = [
    {id: 'panel1', header: 'Accordion 1', Content: <Typography>Content for accordion 1 </Typography>},
    {id: 'panel1', header: 'Accordion 2', Content: <Typography>Content for accordion 2 </Typography>},
]
const CustomAccordion: React.FC = () => {
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded({
            ...expanded,
            [panel]: isExpanded,
        });
    };

    return (
        <div>
            {panels.map(({Content, header, id}) => (
                <Accordion
                    key={id}
                    expanded={expanded[id] === true}
                    onChange={handleChange(id)}
                >
                    <AccordionSummary
                        expandIcon={expanded[id] ? <AddCircleIcon/> : <RemoveIcon/>}
                        id={`${id}bh-header`}
                    >
                        <Typography>{header}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {Content}
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
}

export default CustomAccordion;