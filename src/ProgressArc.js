import React, {Component, PropTypes} from 'react'
import * as d3 from 'd3'

class ProgressArc extends Component {
    displayName: 'ProgressArc';

    tau = Math.PI * 2;

    propTypes: {
        id: PropTypes.string,
        height: PropTypes.number,
        width: PropTypes.number,
        innerRadius: PropTypes.number,
        outerRadius: PropTypes.number,
        backgroundColor: PropTypes.string,
        foregroundColor: PropTypes.string,
        percentComplete: PropTypes.number
    }

    componentDidMount() {
        this.drawArc();
    }

    componentUpdate() {
        this.redrawArc();
    }

    drawArc() {
        const ctx = this.setContext();
        this.setBackground(ctx);
        this.setForeground(ctx);
        this.updatePercent(ctx);
    }

    updatePercent(ctx) {
        return this.setForeground(ctx).transition()
            .duration(this.props.duration)
            .call(this.arcTween, this.tau * this.props.percentComplete, this.arc());
    }

    arcTween(transition, newAngle, arc) {
        transition.attrTween('d', (d) => {
            // BAM!!
            const interpolate = d3.interpolate(d.endAngle, newAngle);
            const newArc = d;
            return (t) => {
                newArc.endAngle = interpolate(t);
                return arc(newArc);
            };
        });
    }

    redrawArc() {
        const ctx = d3.select(`#${this.props.id}`);
        ctx.remove();
        this.drawArc();
    }

    render() {
        return (
            <div ref="arc"></div>
        )
    }

    setContext() {
        const {height, width, id} = this.props;
        return d3.select(this.refs.arc).append('svg')
            .attr('height', height)
            .attr('width', width)
            .attr('id', id)
            .append('g')
            .attr('transform', `translate(${height / 2}, ${width / 2})`);
    }

    setBackground(ctx) {
        return ctx.append('path')
            .datum({endAngle: this.tau})
            .style('fill', this.props.backgroundColor)
            .attr('d', this.arc());
    }

    setForeground(ctx) {
        return ctx.append('path')
            .datum({endAngle: 0})
            .style('fill', this.props.foregroundColor)
            .attr('d', this.arc());
    }

    arc() {
        return d3.arc()
            .innerRadius(this.props.innerRadius)
            .outerRadius(this.props.outerRadius)
            .startAngle(0)
    }
}

export default ProgressArc