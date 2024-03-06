import React, { useEffect, useState } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import RemoveIcon from '@mui/icons-material/Remove'
import { PanelData } from '@/pages/Results/ToggledListItems/ToggledListItems.module.ts'
import { Box } from '@mui/material'

interface ICustomAccordion {
  panels: PanelData[],
  allExpanded: boolean
}

const ToggledListItems: React.FC<ICustomAccordion> = ({ panels, allExpanded }) => {

  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded({
      ...expanded,
      [panel]: isExpanded,
    })
  }

  if (!panels.length) {
    return <Typography>נראה שאין לך מענקים רלוונטיים בנושא זה</Typography>
  }

  return (
    <Box sx={{ alignSelf: 'stretch' }}>
      {panels.map(({ Content, header, id }) => (
        <Accordion key={id} expanded={expanded[id] || allExpanded} onChange={handleChange(id)} sx={{ width: '100%' }}>
          <AccordionSummary
            expandIcon={expanded[id] || allExpanded ? <RemoveIcon color="primary" /> : <AddCircleIcon color="primary" />}
            id={`${id}bh-header`}
            sx={{ '& .MuiAccordionSummary-expandIconWrapper': { order: -1 } }}
          >
            <Typography sx={{ mx: 2 }}> {header}</Typography>
          </AccordionSummary>
          <AccordionDetails>{Content}</AccordionDetails>
        </Accordion>
      ))}
    </Box>
  )
}

export default ToggledListItems
