# Sports Api
implement accessing a certain player, finish at home

finish sports Api
this is for react
<!DOCTYPE html>
<!-- Bucky Roberts -->
<html>
  <head>


  <script src= ./js/react.js></script>
  <script src= ./js/react-dom.js></script>
  <script src= ./js/browser.min.js.js></script>
<div id='root'></div>
<script type="text/babel">
var bacon =React.createClass({
	render: function(){
	return("<p>Hello World</p>");
	}
});
ReactDOM.render(
  <Bacon />,
  document.getElementById('root')
);
</script>




<!DOCTYPE html>
<!-- Bucky  -->
<html>
  <head>


  <script src= ./js/react.js></script>
  <script src= ./js/react-dom.js></script>
  <script src= ./js/browser.min.js.js></script>
<body>
<div id='root'></div>
<script type="text/babel">
var bacon =React.createClass({
	render: function(){
	return("<p>{this.props.title}</p>");
	}
});
ReactDOM.render(
 <div> <Bacon title ='fried' meal='breakfast'/> <Bacon></Bacon></div>,
  document.getElementById('root')
);
</script>
