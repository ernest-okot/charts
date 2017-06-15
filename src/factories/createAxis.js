import Plottable from "plottable";
import approximate from "approximate-number";
import { configureAxisTicking } from './configureTicking'

/**
 * @typedef {Object} NumericAxis - Numeric Axis configuration
 * @private
 * @property {indicator} indicator - Data Indicator
 * @property {boolean} showAxis - Show Axis
 * @property {boolean} showGridlines - Show Grid lines
 * @property {'all'|'even'|'odd'|'sparse'} ticking=all - Ticking method
 * @property {string} axisLabel - Label
 * @property {number} axisMargin - Margin
 * @property {number} axisMinimum - Minimum
 * @property {number} axisMaximum - Maximum
 */

/**
 *
 * @typedef {Object} CategoryAxis - Category Axis Configuration
 * @private
 * @property {indicator} indicator - Data Indicator
 * @property {boolean} showAxis - Show Axis
 * @property {'all'|'even'|'odd'|'sparse'} ticking=all - Ticking method
 * @property {string} axisLabel - Axis Label
 * @property {number} axisMargin - Margin
 * @property {number} innerPadding - Inner Padding
 * @property {number} outerPadding - Outer Padding
 */

export const createNumericAxis = (config) => {

  const {showAxis = false, axisOrientation, axisScale, axisLabel = null, axisMargin = 10, ticking = 'odd'} = config;

  if (!showAxis) return null;

  const alignment = axisOrientation === 'horizontal' ? 'bottom' : 'left';

  const axis = new Plottable.Axes.Numeric(axisScale, alignment)
    .formatter(d => approximate(d))
    .margin(axisMargin)
    .showEndTickLabels(true);

  // Add ticking classes
  configureAxisTicking(axis, ticking);

  const label = axisLabel && new Plottable.Components.AxisLabel(axisLabel, getAxisLabelRotation(alignment));

  return createAxisTable(alignment, axis, label)

};

export const createCategoryAxis = (config) => {
  let {showAxis = false, axisOrientation, axisScale, axisLabel = null, axisMargin = 10} = config;

  if (!showAxis) return null;

  const alignment = axisOrientation === 'vertical' ? 'bottom' : 'left';

  const axis = new Plottable.Axes.Category(axisScale, alignment);

  axis.margin(axisMargin);

  const label = axisLabel && new Plottable.Components.AxisLabel(axisLabel, getAxisLabelRotation(alignment));

  return createAxisTable(alignment, axis, label)
};

export const createAxisTable = (alignment, axis, label) => {

  if (alignment === 'top') {
    return new Plottable.Components.Table([[label], [axis],]);
  }

  if (alignment === 'bottom') {
    return new Plottable.Components.Table([[axis], [label],]);
  }

  if (alignment === 'left') {
    return new Plottable.Components.Table([[label, axis]]);
  }

  if (alignment === 'right') {
    return new Plottable.Components.Table([[axis, label]]);
  }

};

export const getAxisLabelRotation = (alignment) => {
  return labelRotationAngles[alignment]
}

export const labelRotationAngles = {
  top: 0,
  bottom: 0,
  left: -90,
  right: 90
};