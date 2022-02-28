import * as MarkerStore from '../../store/google/GoogleMaps';
import { ApplicationState } from '../../store';
import  GoogleApiWrapper  from './GoogleMapsApi';
import { connect } from 'react-redux';
export default connect(
  (state: ApplicationState) => state.markers,
  MarkerStore.actionCreators
)(GoogleApiWrapper as any);