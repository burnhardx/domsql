const behaviors = {
    remove:'Removes the Node completely from the DOM',
    disappear:'Adds display:none to the Node Style',
    invisble:'Hides the node'
};
var Behavior = (function () {
    var currentBehaviour = behaviors.remove;
    return {
        get: function(){
          return currentBehaviour;
        },
        nodesWillBeRemoved: function(){
            currentBehaviour=behaviors.remove;
        },
        nodesWillDisappear: function(){
            currentBehaviour=behaviors.disappear;
        },
        nodesWillBeInvisible: function(){
            currentBehaviour=behaviors.invisble;
        }
    };

})();


module.exports = {
    from: function(domNode){
        const behaviour = this.behavior.get();
        if(behaviour==behaviors.remove){
            domNode.parentNode.removeChild(domNode)
        }else if(behaviour == behaviors.disappear){
            domNode.style.display='none';
        }else if(behaviour == behaviors.invisble){
            domNode.style.visibility='hidden';
        }
    },
    behavior: Behavior
}