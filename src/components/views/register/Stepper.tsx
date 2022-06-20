import styled from "@emotion/styled";
import { StepConnector, stepConnectorClasses, StepIconProps } from "@mui/material";
import Check from '@mui/icons-material/Check';
import { grey } from "@mui/material/colors";

    export const QontoConnector = styled(StepConnector)(({ theme }: any) => ({
        [`&.${stepConnectorClasses.alternativeLabel}`]: {
          top: 10,
          left: 'calc(-50% + 16px)',
          right: 'calc(50% + 16px)',
        },
        [`&.${stepConnectorClasses.active}`]: {
          [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#784af4',
          },
        },
        [`&.${stepConnectorClasses.completed}`]: {
          [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#784af4',
          },
        },
        [`& .${stepConnectorClasses.line}`]: {
          borderColor: grey[800],
          borderTopWidth: 3,
          borderRadius: 1,
        },
      }));
      
      export const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
        ({ theme, ownerState }: any) => ({
          color: grey[700],
          display: 'flex',
          height: 22,
          alignItems: 'center',
          ...(ownerState.active && {
            color: '#784af4',
          }),
          '& .QontoStepIcon-completedIcon': {
            color: '#784af4',
            zIndex: 1,
            fontSize: 18,
          },
          '& .QontoStepIcon-circle': {
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: 'currentColor',
          },
        }),
      );
      
      export function QontoStepIcon(props: StepIconProps) {
        const { active, completed, className } = props;
      
        return (
          <QontoStepIconRoot ownerState={{ active }} className={className}>
            {completed ? (
              <Check className="QontoStepIcon-completedIcon" />
            ) : (
              <div className="QontoStepIcon-circle" />
            )}
          </QontoStepIconRoot>
        );
      }